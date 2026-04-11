import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Grid,
  Button,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VideocamIcon from "@mui/icons-material/Videocam";

export default function ImageMode({ detectAllFaces, changeMode }) {
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const syncCanvasAndDetect = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !img.naturalWidth) return;

    const apply = () => {
      const r = img.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width));
      const h = Math.max(1, Math.round(r.height));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      void detectAllFaces();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(apply);
    });
  }, [detectAllFaces]);

  useEffect(() => {
    const img = imgRef.current;
    if (!imgSrc || !img) return undefined;

    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (!img.naturalWidth) return;
        syncCanvasAndDetect();
      }, 80);
    });
    ro.observe(img);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [imgSrc, syncCanvasAndDetect]);

  const onFileChange = (event) => {
    const photo = event.target.files[0];
    if (!photo) return;
    setImgSrc(URL.createObjectURL(photo));
  };

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.9rem !important" }} />}
          onClick={() => changeMode("main")}
          variant="contained"
          color="primary"
        >
          Home
        </Button>
        <Button
          onClick={() => changeMode("webcam-mode")}
          variant="outlined"
          startIcon={<VideocamIcon />}
        >
          Switch to webcam
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
          Upload a clear, front-facing photo for best results. Detection runs when the image has finished
          loading and tracks the on-screen size if you resize the window.
        </Typography>
        <Button variant="contained" component="label" color="secondary">
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFileChange} />
        </Button>
      </Paper>

      <Grid container justifyContent="center" sx={{ width: "100%", minWidth: 0 }}>
        <Grid item xs={12} sx={{ minWidth: 0, maxWidth: "100%" }}>
          {imgSrc && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  maxWidth: "100%",
                  lineHeight: 0,
                }}
              >
              <Box
                component="img"
                ref={imgRef}
                id="display-img"
                onLoad={syncCanvasAndDetect}
                src={imgSrc}
                alt="Uploaded preview"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                  verticalAlign: "bottom",
                }}
              />
              <Box
                component="canvas"
                ref={canvasRef}
                id="imgCanvas"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
