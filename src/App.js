import React, { useState, useRef } from 'react';
import RecorderControls from './components/RecorderControls';
import TranscriptDisplay from './components/TranscriptDisplay';
import styles from './App.module.css';

function App() {
  const [recording, setRecording] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const mockResponses = [
    "Today we discussed the quarterly sales targets and the upcoming product launch. Action items include preparing the marketing strategy and coordinating with the design team by next week.",
    "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. The process involves chlorophyll and generates oxygen as a byproduct.",
    "I feel more focused after today's meditation session. I plan to continue this habit every morning to improve my concentration and mental clarity.",
    "We need to review the budget allocations and finalize the vendor list. Please ensure the team submits feedback by Thursday and schedule a follow-up call for Friday afternoon.",
    "The project deadline is approaching quickly, so it is essential to finalize all deliverables and ensure quality assurance tests are completed by the end of the week.",
    "Customer feedback suggests improvements in user experience and navigation flow. We should prioritize implementing these changes in the next update cycle.",
    "Our next team-building activity will be a workshop on effective communication. Please RSVP by Wednesday so we can arrange the venue and materials.",
    "The training session will cover cloud infrastructure management, deployment strategies, and best practices for ensuring system reliability and uptime.",
    "Please prepare the quarterly report by Monday morning. Include performance metrics, cost analysis, and recommendations for improving operational efficiency.",
    "The marketing team is planning a new campaign targeting younger audiences through social media platforms. We need creative assets and a content calendar by next week.",
    "Ensure that all documentation is updated before the software release. This includes user guides, troubleshooting steps, and API references."
  ];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioFile = new File([audioBlob], 'recording.webm');
      
     

      // For demo mode: show mock data
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      const newTranscript = mockResponses[randomIndex];

      // Append the new transcript to the history
      setTranscripts(prev => [newTranscript,...prev]);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const clearTranscripts = () => {
    setTranscripts([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Notes Assistant</h1>
      <RecorderControls
        isRecording={recording}
        onStart={startRecording}
        onStop={stopRecording}
        onClear={clearTranscripts}
      />
      <TranscriptDisplay transcripts={transcripts} />
    </div>
  );
}

export default App;
