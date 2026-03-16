import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentIndex,
        setCurrentIndex,
        loading,
        setLoading,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
