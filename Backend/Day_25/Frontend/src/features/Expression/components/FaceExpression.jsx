/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("");
  const [detecting, setDetecting] = useState(false);

  // CAMERA LIFECYCLE
  useEffect(() => {
    if (!detecting) return;

    async function startCamera() {
      await init({ landmarkerRef, videoRef, streamRef });
    }

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
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

    const exp = detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    console.log(exp);

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
    <div style={{ textAlign: "center", position: "relative" }}>
      {/* CAMERA */}
      {detecting && (
        <video
          ref={videoRef}
          style={{
            width: "400px",
            borderRadius: "12px",
          }}
          playsInline
        />
      )}

      {/* MOOD OVERLAY */}
      {!detecting && expression && (
        <div
          style={{
            width: "400px",
            height: "250px",
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "600",
            margin: "auto",
          }}
        >
          {emojiMap[expression]} {expression}
        </div>
      )}

      <br />

      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#F97316",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        {detecting ? "Detect Expression" : "Start Detection"}
      </button>
    </div>
  );
}