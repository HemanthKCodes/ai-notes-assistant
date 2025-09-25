import React, { useState, useRef } from "react";
import RecorderControls from "./components/RecorderControls";
import TranscriptDisplay from "./components/TranscriptDisplay";
import styles from "./App.module.css";

function App() {
  const [recording, setRecording] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [liveTranscript, setLiveTranscript] = useState("");
  const recognitionRef = useRef(null);
  const sessionTranscriptRef = useRef(""); // accumulates current session text

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interimTranscript += event.results[i][0].transcript;
      }

      if (event.results[event.results.length - 1].isFinal) {
        // append finalized text to session buffer
        sessionTranscriptRef.current += interimTranscript + " ";
        setLiveTranscript(sessionTranscriptRef.current);
      } else {
        // show live text
        setLiveTranscript(sessionTranscriptRef.current + interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("SpeechRecognition error:", event.error);
    };

    recognition.onend = () => {
      // Auto-restart only if user is still recording
      if (recording) {
        startRecognition();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const startRecording = () => {
    sessionTranscriptRef.current = ""; // reset buffer for new session
    setLiveTranscript("");
    setRecording(true);
    startRecognition();
  };

  const stopRecording = () => {
    setRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // prevent auto-restart
      recognitionRef.current.stop();
    }

    const finalText = sessionTranscriptRef.current.trim();
    if (finalText !== "") {
      // Push entire session as a new transcript item
      setTranscripts((prev) => [finalText, ...prev]);
    }

    sessionTranscriptRef.current = "";
    setLiveTranscript(""); // clear live only after pushing
  };

  const clearTranscripts = () => {
    // Stop recording if active
    if (recording) {
      stopRecording();
    }

    setTranscripts([]);
    setLiveTranscript("");
    sessionTranscriptRef.current = "";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Notes Assistant (Live)</h1>
      <RecorderControls
        isRecording={recording}
        onStart={startRecording}
        onStop={stopRecording}
        onClear={clearTranscripts}
      />
      <TranscriptDisplay
        transcripts={transcripts}
        liveTranscript={liveTranscript}
      />
    </div>
  );
}

export default App;
