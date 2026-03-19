import React from "react";
import "./navbar.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { AuthContext } from "../../auth/auth.context";
import { useContext } from "react";

const Navbar = () => {

  const { user } = useContext(AuthContext);

    const { handleLogout, loading } = useAuth();
    console.log(user)
  return (
    <nav className="navbar">
      {/* LEFT - LOGO */}
      <div className="logo">
        🎧 Moodify
      </div>

      {/* RIGHT - PROFILE */}
      <div className="nav-actions">
        <div className="profile">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>   
          <span className="username">{user.username}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
      </div>
    </nav>
  );
};

export default Navbar;