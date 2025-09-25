import React from "react";
import styles from "./TranscriptDisplay.module.css";

const TranscriptDisplay = ({ transcripts, liveTranscript }) => {
  return (
    <div className={styles.transcriptBox}>
      <h2>Transcript History</h2>

      {liveTranscript && (
        <div
          className={styles.transcriptItem}
          style={{ backgroundColor: "#e6f7ff" }}
        >
          <p>
            <strong>Live:</strong> {liveTranscript}
          </p>
        </div>
      )}

      {transcripts.length === 0 ? (
        <p>No transcripts yet. Start recording to see the notes here.</p>
      ) : (
        transcripts.map((text, index) => (
          <div key={index} className={styles.transcriptItem}>
            <p>{text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TranscriptDisplay;
