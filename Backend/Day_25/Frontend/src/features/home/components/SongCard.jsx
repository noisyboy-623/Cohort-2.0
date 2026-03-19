import React, { useContext } from "react";
import { SongContext } from "../song.context";
import "./songcard.scss";

const SongCard = () => {
  const { playlist, currentIndex } = useContext(SongContext);
  const song = playlist[currentIndex];

  if (!song) {
    return (
      <div className="song-card-panel">
        <div className="empty-card">
          <p>No song playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="song-card-panel">
  <div className="song-card">

    <img src={song.posterURL} alt={song.title} />

    <h2>{song.title}</h2>
    <p className="artist">{song.artist}</p>

    <div className="song-meta">
      <div>
        <span>Album</span>
        <p>{song.album}</p>
      </div>

      <div>
        <span>Year</span>
        <p>{song.year}</p>
      </div>

      {/* <div>
        <span>Composer</span>
        <p>{song.composer}</p>
      </div> */}

      <div>
        <span>Mood</span>
        <p className="mood">{song.mood}</p>
      </div>
    </div>

  </div>
</div>
  );
};

export default SongCard;