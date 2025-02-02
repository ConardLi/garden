"use client";

import { Box } from "@mui/material";

interface ShadowPreviewProps {
  shadowString: string;
}

export default function ShadowPreview({ shadowString }: ShadowPreviewProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 200,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: shadowString,
        }}
      />
    </Box>
  );
}
