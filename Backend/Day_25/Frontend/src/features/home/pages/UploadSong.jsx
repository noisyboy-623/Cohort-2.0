import React, { useRef, useState } from 'react';
import { useSong } from '../hook/useSong';
import { useNavigate } from 'react-router';
import "./uploadSong.scss";

const UploadSong = () => {
  const [mood, setMood] = useState("Happy");
  const [fileName, setFileName] = useState("");
  const uploadSongInputFieldRef = useRef(null);

  const { loading, handleUploadSong } = useSong();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = uploadSongInputFieldRef.current.files[0];
    if (!file) return alert("Please select a song first!");

    await handleUploadSong(file, (mood).toLowerCase());
    navigate('/');
  };

  const shortenFileName = (name) => {
  if (name.length <= 20) return name;
  return name.slice(0, 10) + "..." + name.slice(-8);
};

  if (loading) {
    return (
      <main className="upload-song-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <h1>Uploading your masterpiece...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="upload-song-page">
      <div className="form-container">
        <header>
          <h1>Upload Song</h1>
          <p>Share your sound with the world</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="upload-section">
            <label className="song-upload-label" htmlFor="songFile">
              <i className="upload-icon">♪</i>
              {fileName ? shortenFileName(fileName) : "Choose Audio File"}
            </label>
            <input 
              ref={uploadSongInputFieldRef} 
              hidden 
              type="file" 
              accept="audio/*" 
              id="songFile" 
              onChange={handleFileChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="mood">Vibe / Mood</label>
            <input
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              type="text"
              id="mood"
              placeholder="e.g. Happy, Sad, Surprised..."
              className="mood-input"
            />
          </div>

          <button type="submit" className="button primary-button">
            Publish Song
          </button>
        </form>
      </div>
    </main>
  );
};

export default UploadSong;