// api/transcribe.js

// Example function to call backend API
export const transcribeAudio = async (audioFile) => {
    const formData = new FormData();
    formData.append('file', audioFile);
  
    const response = await fetch('https://your-backend-url/api/transcribe', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Transcription failed');
    }
  
    const data = await response.json();
    return data;
  };
  