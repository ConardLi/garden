"use client";

import { Box, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { EasingConfig } from "../types";
import "../styles.css";

interface EasingPreviewProps {
  easingString: string;
  compareEasingString?: string;
  config: EasingConfig;
  compareMode: boolean;
}

export default function EasingPreview({
  easingString,
  compareEasingString,
  config,
  compareMode
}: EasingPreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const compareBoxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const updateAnimation = (element: HTMLDivElement | null, easing: string) => {
      if (!element) return;
      
      const animationName = {
        horizontal: 'moveBox',
        vertical: 'moveBoxVertical',
        diagonal: 'moveBoxDiagonal'
      }[config.direction];

      element.style.animation = 'none';
      void element.offsetWidth;
      element.style.animation = `${animationName} ${config.duration}s ${easing} infinite`;
    };

    updateAnimation(boxRef.current, easingString);
    if (compareMode && compareEasingString) {
      updateAnimation(compareBoxRef.current, compareEasingString);
    }
  }, [easingString, compareEasingString, config.direction, config.duration, compareMode]);

  const getInitialPosition = () => {
    switch (config.direction) {
      case 'vertical':
        return { left: '50%', top: 0, transform: 'translateX(-50%)' };
      case 'diagonal':
        return { left: 0, top: 0, transform: 'none' };
      default:
        return { left: 0, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  const initialPosition = getInitialPosition();

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "#f5f5f5",
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
      }}
    >
      <Box
        ref={boxRef}
        sx={{
          width: 50,
          height: 50,
          bgcolor: theme.palette.primary.main,
          borderRadius: 1,
          position: 'absolute',
          ...initialPosition,
          ...(compareMode && {
            opacity: 0.8,
            zIndex: 1
          })
        }}
      />
      {compareMode && (
        <Box
          ref={compareBoxRef}
          sx={{
            width: 50,
            height: 50,
            bgcolor: theme.palette.secondary.main,
            borderRadius: 1,
            position: 'absolute',
            opacity: 0.8,
            ...initialPosition
          }}
        />
      )}
    </Box>
  );
}
