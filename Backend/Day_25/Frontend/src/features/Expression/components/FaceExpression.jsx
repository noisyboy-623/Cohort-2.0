/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { useNavigate } from "react-router";
import "./faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("");
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (!detecting) return;
    async function startCamera() {
      await init({ landmarkerRef, videoRef, streamRef });
    }
    startCamera();
    return () => stopCamera();
  }, [detecting]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  function handleClick() {
    if (!detecting) {
      setDetecting(true);
      return;
    }
    const exp = detect({ landmarkerRef, videoRef, setExpression });
    setDetecting(false);
    stopCamera();
    onClick(exp);
  }

  const emojiMap = {
    happy: "😄",
    sad: "😢",
    surprised: "😮",
    neutral: "😐",
  };

  return (
    <div className="face-expression-container">
      {/* 1. MEDIA BOX (Constant size to prevent jumping) */}
      <div className="media-viewport">
        {detecting ? (
          <video ref={videoRef} playsInline autoPlay muted className="camera-feed" />
        ) : (
          <div className="placeholder-box">
            {expression ? (
              <div className="result-display">
                <span className="emoji">{emojiMap[expression]}</span>
                <p>Mood Detected :</p>
                <span className="text">{expression}</span>
              </div>
            ) : (
              <div className="idle-state">
                <div className="scan-icon">📸</div>
                <p>Ready to detect mood</p>
              </div>
            )}
          </div>
        )}
        
        {detecting && <div className="scanning-line" />}
      </div>

      {/* 2. ACTIONS */}
      <div className="action-row">
        <button onClick={handleClick} className="detect-btn">
          {detecting ? "Capture Mood" : "Start Detection"}
        </button>
        <button onClick={() => navigate("/upload-song")} className="upload-btn">
          Upload Song
        </button>
      </div>
    </div>
  );
}