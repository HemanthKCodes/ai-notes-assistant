import React from 'react';
import styles from './TranscriptDisplay.module.css';

const TranscriptDisplay = ({ transcripts }) => {
  return (
    <div className={styles.transcriptBox}>
      <h2>Transcript History</h2>
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
