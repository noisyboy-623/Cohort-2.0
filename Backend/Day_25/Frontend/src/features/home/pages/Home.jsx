import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import Sidebar from "../components/Sidebar";
import "./home.scss";
import { useSong } from "../hook/useSong";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* CENTER CONTENT */}
      <div className="center-content">
        <FaceExpression
          onClick={(expression) => handleGetSong({ mood: expression })}
        />
      </div>

      {/* RIGHT PLAYLIST */}
      <Playlist />

      {/* PLAYER */}
      <Player />

    </div>
  );
};

export default Home;