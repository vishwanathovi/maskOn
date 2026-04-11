import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Link,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ minHeight: { xs: 64, sm: 72 }, py: 1 }}>
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <Link
            href="/"
            underline="none"
            aria-label="MaskOn home"
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              py: 0.5,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: '"Outfit", "DM Sans", system-ui, sans-serif',
                fontWeight: 900,
                fontSize: { xs: "1.55rem", sm: "1.85rem" },
                letterSpacing: "-0.06em",
                color: "common.white",
                lineHeight: 1,
                WebkitFontSmoothing: "antialiased",
              }}
            >
              Mask
              <Box
                component="span"
                sx={{
                  fontWeight: 900,
                  color: "secondary.light",
                  textShadow: "0 0 28px rgba(45, 212, 191, 0.4)",
                }}
              >
                On
              </Box>
            </Typography>
          </Link>
          <Box sx={{ textAlign: "right", minWidth: 0, pl: 1, flexShrink: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "common.white",
                fontWeight: 500,
                letterSpacing: 0.2,
                fontSize: { xs: "0.8rem", sm: "1rem" },
                lineHeight: 1.35,
              }}
            >
              Browser-based face mask detection
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.85)",
                display: "block",
                mt: 0.25,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                lineHeight: 1.35,
              }}
            >
              TensorFlow.js · face-api.js · runs locally after models load
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
