import React from 'react';
import styles from './RecorderControls.module.css';

const RecorderControls = ({ isRecording, onStart, onStop, onClear }) => {
  return (
    <div className={styles.controls}>
      {isRecording ? (
        <button className={styles.stopButton} onClick={onStop}>
          ⏹ Stop Recording
        </button>
      ) : (
        <button className={styles.startButton} onClick={onStart}>
          🎙️ Start Recording
        </button>
      )}
      <button className={styles.clearButton} onClick={onClear}>
        🧹 Clear History
      </button>
    </div>
  );
};

export default RecorderControls;
