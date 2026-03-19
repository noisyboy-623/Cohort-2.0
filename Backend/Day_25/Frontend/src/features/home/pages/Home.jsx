import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import SongCard from "../components/SongCard";
import Navbar from "../components/Navbar";
import "./home.scss";
import { useSong } from "../hook/useSong";


const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <div className="home-wrapper">
      <Navbar />
      <main className="app-layout">
        
        <aside className="detection-sidebar">
          <FaceExpression 
            onClick={(expression) => handleGetSong({ mood: expression })} 
          />
        </aside>

        <section className="playlist-container">
          <Playlist />
        </section>

          <aside className="song-card-wrapper">
  <SongCard />
</aside>
       
        <Player />

      </main>
    </div>
  );
};
export default Home;