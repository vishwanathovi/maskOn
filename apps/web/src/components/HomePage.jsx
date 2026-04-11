import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
  LinearProgress,
  alpha,
} from "@mui/material";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export default function HomePage({ changeMode, modelReady }) {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
          border: 1,
          borderColor: "divider",
          textAlign: "left",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Detect face masks in your browser
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: "62ch" }}>
          This demo locates faces with a lightweight detector (face-api.js TinyFaceDetector), crops each
          face, and classifies it with a small convolutional network trained for mask vs. no-mask. Inference
          runs in the browser with TensorFlow.js; images are not uploaded to a server for prediction.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip size="small" label="Client-side ML" variant="outlined" />
          <Chip size="small" label="Upload or webcam" variant="outlined" />
          <Chip size="small" label="Educational demo" color="warning" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "62ch" }}>
          <strong>Note:</strong> This is not a medical or compliance tool—lighting, angles, and model limits
          affect accuracy. Use it to explore how in-browser vision models work.
        </Typography>
        {!modelReady && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Loading neural network weights…
            </Typography>
            <LinearProgress />
          </Box>
        )}
      </Paper>

      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>
        Choose a mode
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          >
            <CardActionArea
              onClick={() => changeMode("image-mode")}
              sx={{ height: "100%", alignItems: "stretch" }}
              disabled={!modelReady}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PhotoLibraryOutlinedIcon color="primary" fontSize="large" />
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6" gutterBottom>
                      Upload an image
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pick a photo from your device. After it loads, faces are found and each crop is
                      classified as mask or no mask, with boxes drawn on the preview.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          >
            <CardActionArea
              onClick={() => changeMode("webcam-mode")}
              sx={{ height: "100%", alignItems: "stretch" }}
              disabled={!modelReady}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <VideocamOutlinedIcon color="secondary" fontSize="large" />
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6" gutterBottom>
                      Use your webcam
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Grant camera access for a live feed. The app samples frames periodically, detects
                      faces, and overlays labels—useful for quick interactive tests.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
