import React, { useCallback, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  nets,
  detectAllFaces,
  TinyFaceDetectorOptions,
  resizeResults,
  extractFaces,
  draw,
} from "face-api.js";
import { Box, Container, Stack } from "@mui/material";
import ImageMode from "./components/ImageMode";
import WebcamMode from "./components/WebcamMode";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { getMediaDisplaySize } from "./mediaDisplaySize";

function getModelBaseUrl() {
  const envBase = import.meta.env.VITE_MODEL_BASE_URL;
  if (envBase && String(envBase).trim()) {
    return String(envBase).replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return "http://localhost:8080";
}

export default function App() {
  const [model, setModel] = useState(null);
  const [mode, setMode] = useState("main");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const base = getModelBaseUrl();
      const loaded = await tf.loadLayersModel(
        `${base}/model/maskModel/model.json`
      );
      if (cancelled) return;
      console.log("Info:: Mask model loaded successfully");

      await nets.tinyFaceDetector.load(
        `${base}/model/faceDetectionModel/tiny_face_detector_model-weights_manifest.json`
      );
      if (cancelled) return;
      console.log("Info:: Face model loaded successfully");

      setModel(loaded);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const predictImage = useCallback(async (canvases) => {
    if (!canvases || !model) return [];

    const predictions = [];
    for (let i = 0; i < canvases.length; i++) {
      const img = canvases[i];
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([150, 150])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

      const confidence = await model.predict(tensor).data();
      predictions.push(confidence[0]);
      tf.dispose(tensor);
    }
    return predictions;
  }, [model]);

  const drawMaskDetections = useCallback((predictions, resizedDetections) => {
    if (!predictions || !resizedDetections) return;

    const camCanvas =
      mode === "webcam-mode"
        ? document.getElementById("webCamCanvas")
        : document.getElementById("imgCanvas");

    if (!camCanvas) return;

    const context = camCanvas.getContext("2d");
    context.clearRect(0, 0, camCanvas.width, camCanvas.height);

    for (let i = 0; i < predictions.length; i++) {
      const maskFlag = predictions[i] > 0.5 ? "Without Mask" : "With Mask";
      const box = resizedDetections[i]._box;
      const drawBox = new draw.DrawBox(box, { label: maskFlag });
      drawBox.draw(camCanvas);
    }
  }, [mode]);

  const detectAllFacesHandler = useCallback(async () => {
    const input =
      mode === "image-mode"
        ? document.getElementById("display-img")
        : document.getElementById("display-web-img");

    if (!input) return;

    const displaySize = getMediaDisplaySize(input);

    const detections = await detectAllFaces(
      input,
      new TinyFaceDetectorOptions({ scoreThreshold: 0.3 })
    );
    const resizedDetections = resizeResults(detections, displaySize);
    const canvases = await extractFaces(input, resizedDetections);
    const predictions = await predictImage(canvases);
    drawMaskDetections(predictions, resizedDetections);
  }, [mode, predictImage, drawMaskDetections]);

  const changeMode = useCallback((next) => {
    setMode(next);
  }, []);

  let body;
  switch (mode) {
    case "main":
      body = <HomePage changeMode={changeMode} modelReady={!!model} />;
      break;
    case "image-mode":
      body = (
        <ImageMode
          changeMode={changeMode}
          detectAllFaces={detectAllFacesHandler}
        />
      );
      break;
    case "webcam-mode":
      body = (
        <WebcamMode
          changeMode={changeMode}
          detectAllFaces={detectAllFacesHandler}
        />
      );
      break;
    default:
      body = null;
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          py: { xs: 2, md: 4 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>{body}</Stack>
        </Container>
      </Box>
    </Box>
  );
}
