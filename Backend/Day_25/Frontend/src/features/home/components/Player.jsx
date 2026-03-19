  /* eslint-disable react-hooks/set-state-in-effect */
  import React, { useContext, useEffect, useRef, useState } from "react";
  import { SongContext } from "../song.context";
  import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaStepBackward,
    FaStepForward,
    FaRandom,
    FaRedoAlt,
  } from "react-icons/fa";
  import "./player.scss";

  const Player = () => {
    const { playlist, currentIndex, setCurrentIndex } = useContext(SongContext);
    const song = playlist[currentIndex];
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        setPlaying(true);
      }
    }, [song]);

    // Format time in MM:SS
    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
      return "0:00";
    };

    const togglePlay = () => {
      if (!playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setPlaying(!playing);
    };

    const handleTimeUpdate = () => {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const seekSong = (e) => {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    };

    const changeVolume = (e) => {
      const v = e.target.value;
      setVolume(v);
      audioRef.current.volume = v;
    };

    const changeSpeed = (e) => {
      const s = e.target.value;
      setSpeed(s);
      audioRef.current.playbackRate = s;
    };

    const nextSong = () => {
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        setCurrentIndex(randomIndex);
      } else {
        setCurrentIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
      }
    };

    const handleSongEnd = () => {
      if (repeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        nextSong();
      }
    };

    const prevSong = () => {
      setCurrentIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    };

    if (!song) return null; // Hide player if no song is selected

    return (
      <div className="player">
        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleSongEnd}
        />

        {/* LEFT - Song Info */}
        <div className="player-left">
          <img src={song.posterURL} alt={song.title} />
          <div className="song-info">
            <h4>{song.title}</h4>
            <p>{song.mood}</p>
          </div>
        </div>

        {/* CENTER - Controls & Progress */}
        <div className="player-center">
          <div className="controls">
            <button
              className={`icon-btn secondary ${shuffle ? "active" : ""}`}
              onClick={() => setShuffle(!shuffle)}
            >
              <FaRandom />
            </button>

            <button className="icon-btn" onClick={prevSong}>
              <FaStepBackward />
            </button>

            <button className="play-btn" onClick={togglePlay}>
              {playing ? <FaPause /> : <FaPlay style={{ marginLeft: "3px" }} />}
            </button>

            <button className="icon-btn" onClick={nextSong}>
              <FaStepForward />
            </button>
            <button
              className={`icon-btn secondary ${repeat ? "active" : ""}`}
              onClick={() => setRepeat(!repeat)}
            >
              <FaRedoAlt />
            </button>
          </div>

          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={seekSong}
              className="progress-bar"
              style={{
                background: `linear-gradient(to right, #F97316 ${progress}%, #4B5563 ${progress}%)`,
              }}
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT - Volume & Speed */}
        <div className="player-right">
          <div className="volume-control">
            {volume > 0 ? (
              <FaVolumeUp className="icon-muted" />
            ) : (
              <FaVolumeMute className="icon-muted" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="volume-bar"
              style={{
                background: `linear-gradient(to right, #F97316 ${volume * 100}%, #4c634b ${volume * 100}%)`,
              }}
            />
          </div>

          <select
            value={speed}
            onChange={changeSpeed}
            className="speed-control"
            title="Playback Speed"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    );
  };

  export default Player;
