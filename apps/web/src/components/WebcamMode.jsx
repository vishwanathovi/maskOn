import React from "react";
import { Button, Stack, Typography, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import WebcamCapture from "./WebcamCapture";

export default function WebcamMode({ detectAllFaces, changeMode }) {
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
          onClick={() => changeMode("image-mode")}
          variant="outlined"
          startIcon={<PhotoLibraryIcon />}
        >
          Upload image instead
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary">
          The preview updates about once per second. Allow camera access when prompted. Processing still
          happens in your browser; video is not sent to a remote API for this demo.
        </Typography>
      </Paper>

      <WebcamCapture predict={detectAllFaces} />
    </Stack>
  );
}
