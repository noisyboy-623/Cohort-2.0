import React, { useContext } from "react";
import { SongContext } from "../song.context";
import "./playlist.scss";

const Playlist = () => {
  const { playlist, currentIndex, setCurrentIndex } =
    useContext(SongContext);

  return (
    <div className="playlist-panel">

      <h3>Mood Playlist</h3>

      {playlist.map((song, index) => (
        <div
          key={song._id}
          className={`playlist-item ${
            index === currentIndex ? "active" : ""
          }`}
          onClick={() => setCurrentIndex(index)}
        >
          <img src={song.posterURL} alt={song.title} />

          <div>
            <p className="title">{song.title}</p>
            <span className="mood">{song.mood}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;