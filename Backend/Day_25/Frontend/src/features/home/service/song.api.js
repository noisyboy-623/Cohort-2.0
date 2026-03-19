import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get("/api/songs?mood=" + mood);
  return response.data;
}

export async function uploadSong({ songFile, mood }) {
  const formData = new FormData();
  formData.append("song", songFile);
  formData.append("mood", mood);
  const response = await api.post("/api/songs", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
  return response.data;
}

