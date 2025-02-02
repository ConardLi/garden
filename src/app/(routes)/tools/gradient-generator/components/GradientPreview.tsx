"use client";

import { Box } from "@mui/material";

interface GradientPreviewProps {
  gradientString: string;
}

export default function GradientPreview({ gradientString }: GradientPreviewProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        background: gradientString,
        borderRadius: 1,
      }}
    />
  );
}
