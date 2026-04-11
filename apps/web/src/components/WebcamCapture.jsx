import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Box } from "@mui/material";

export default function WebcamCapture({ predict }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [{ camWidth, camHeight }, setDims] = useState({ camWidth: 640, camHeight: 480 });

  useEffect(() => {
    setDims(
      typeof window !== "undefined" && window.innerWidth < 640
        ? { camWidth: 320, camHeight: 240 }
        : { camWidth: 640, camHeight: 480 }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const shot = webcamRef.current?.getScreenshot?.();
      if (shot) setImgSrc(shot);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = 10;

  return (
    <Box
      sx={{
        position: "relative",
        width: camWidth + pad * 2,
        height: camHeight + pad * 2,
        mx: "auto",
        maxWidth: "100%",
      }}
    >
      <Webcam
        id="webcam-video"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={camWidth}
        height={camHeight}
        videoConstraints={{ facingMode: "user" }}
        style={{
          display: "block",
          padding: pad,
        }}
      />
      <canvas
        id="webCamCanvas"
        width={camWidth}
        height={camHeight}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: pad,
          pointerEvents: "none",
        }}
      />
      {imgSrc ? (
        <img
          id="display-web-img"
          onLoad={predict}
          src={imgSrc}
          alt=""
          style={{ display: "none" }}
        />
      ) : null}
    </Box>
  );
}
