import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/x2gd4sgsg/cohort-2/moodify/songs/Khaamiyan_bWRvI5ueR.mp3",
    posterURL: "https://ik.imagekit.io/x2gd4sgsg/cohort-2/moodify/posters/Khaamiyan_Qul9iJu7Y.jpeg",
    title: "Khaamiyan",
    mood: "happy",
  })

  const [loading, setLoading] = useState(false);

  return (
      <SongContext.Provider value = {{song, setSong, loading, setLoading}}>
          {children}
      </SongContext.Provider>
  )
};
