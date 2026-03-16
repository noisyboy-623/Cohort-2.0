import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const {
    playlist,
    setPlaylist,
    currentIndex,
    setCurrentIndex,
    loading,
    setLoading,
  } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setPlaylist(data.playlist);
    setCurrentIndex(0);
    setLoading(false);
  }

  return { loading, playlist, currentIndex, setCurrentIndex, handleGetSong };
};
