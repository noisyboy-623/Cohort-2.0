import React from "react";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2>Moodify</h2>

      <nav>
        <p>Home</p>
        <p>Your Library</p>
        <p>Liked Songs</p>
      </nav>

    </div>
  );
};

export default Sidebar;