"use client";

import { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import GradientPreview from "./components/GradientPreview";
import GradientControls from "./components/GradientControls";
import { GradientStop } from "./types";

export default function GradientGenerator() {
  const [gradientStops, setGradientStops] = useState<GradientStop[]>([
    { color: "#FF0000", position: 0 },
    { color: "#0000FF", position: 100 },
  ]);
  const [gradientType, setGradientType] = useState<"linear" | "radial">(
    "linear"
  );
  const [angle, setAngle] = useState(90);

  const gradientString =
    gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${gradientStops
          .map((stop) => `${stop.color} ${stop.position}%`)
          .join(", ")})`
      : `radial-gradient(circle, ${gradientStops
          .map((stop) => `${stop.color} ${stop.position}%`)
          .join(", ")})`;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mt: 0 }}>
        <Paper elevation={3}>
          <GradientPreview gradientString={gradientString} />
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <GradientControls
            gradientStops={gradientStops}
            setGradientStops={setGradientStops}
            gradientType={gradientType}
            setGradientType={setGradientType}
            angle={angle}
            setAngle={setAngle}
            gradientString={gradientString}
          />
        </Paper>
      </Box>
    </Container>
  );
}
