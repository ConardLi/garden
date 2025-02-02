"use client";

import { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import ShadowPreview from "./components/ShadowPreview";
import ShadowControls from "./components/ShadowControls";
import { ShadowConfig } from "./types";

export default function ShadowGenerator() {
  const [shadows, setShadows] = useState<ShadowConfig[]>([
    {
      offsetX: 5,
      offsetY: 5,
      blur: 10,
      spread: 0,
      color: "rgba(0,0,0,0.2)",
      inset: false,
    },
  ]);

  const shadowString = shadows
    .map(
      (shadow) =>
        `${shadow.inset ? "inset " : ""}${shadow.offsetX}px ${
          shadow.offsetY
        }px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    )
    .join(", ");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mt: 0 }}>
        <Paper elevation={3}>
          <ShadowPreview shadowString={shadowString} />
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <ShadowControls
            shadows={shadows}
            setShadows={setShadows}
            shadowString={shadowString}
          />
        </Paper>
      </Box>
    </Container>
  );
}
