"use client";

import {
  Box,
  Button,
  Grid,
  Slider,
  Tooltip,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { EasingConfig, EasingPreset } from "../types";
import { useCallback, useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const presets: EasingPreset[] = [
  {
    name: "线性",
    config: {
      p1: { x: 0, y: 0 },
      p2: { x: 1, y: 1 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "缓入",
    config: {
      p1: { x: 0.42, y: 0 },
      p2: { x: 1, y: 1 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "缓出",
    config: {
      p1: { x: 0, y: 0 },
      p2: { x: 0.58, y: 1 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "缓入缓出",
    config: {
      p1: { x: 0.66, y: 0 },
      p2: { x: 0.34, y: 1 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "弹跳",
    config: {
      p1: { x: 0.68, y: -0.55 },
      p2: { x: 0.265, y: 1.55 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "弹性",
    config: {
      p1: { x: 0.25, y: 0.1 },
      p2: { x: 0.25, y: 1 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "回弹",
    config: {
      p1: { x: 0.175, y: 0.885 },
      p2: { x: 0.32, y: 1.275 },
      duration: 2,
      direction: 'horizontal',
    },
  },
  {
    name: "极速",
    config: {
      p1: { x: 0.55, y: 0 },
      p2: { x: 0.1, y: 0.9 },
      duration: 2,
      direction: 'horizontal',
    },
  },
];

interface EasingControlsProps {
  config: EasingConfig;
  setConfig: (config: EasingConfig) => void;
  easingString: string;
}

export default function EasingControls({
  config,
  setConfig,
  easingString,
}: EasingControlsProps) {
  const handlePointChange = (
    point: "p1" | "p2",
    axis: "x" | "y",
    value: number
  ) => {
    setConfig({
      ...config,
      [point]: {
        ...config[point],
        [axis]: value,
      },
    });
  };

  const applyPreset = (preset: EasingPreset) => {
    setConfig(preset.config);
  };

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(easingString);
  }, [easingString]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            预设
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outlined"
                size="small"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </Button>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            控制点 1
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>X: {config.p1.x.toFixed(2)}</Typography>
            <Slider
              value={config.p1.x}
              onChange={(_, value) =>
                handlePointChange("p1", "x", value as number)
              }
              min={0}
              max={1}
              step={0.01}
            />
          </Box>
          <Box>
            <Typography>Y: {config.p1.y.toFixed(2)}</Typography>
            <Slider
              value={config.p1.y}
              onChange={(_, value) =>
                handlePointChange("p1", "y", value as number)
              }
              min={-2}
              max={2}
              step={0.01}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            控制点 2
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>X: {config.p2.x.toFixed(2)}</Typography>
            <Slider
              value={config.p2.x}
              onChange={(_, value) =>
                handlePointChange("p2", "x", value as number)
              }
              min={0}
              max={1}
              step={0.01}
            />
          </Box>
          <Box>
            <Typography>Y: {config.p2.y.toFixed(2)}</Typography>
            <Slider
              value={config.p2.y}
              onChange={(_, value) =>
                handlePointChange("p2", "y", value as number)
              }
              min={-2}
              max={2}
              step={0.01}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            CSS 代码
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 1,
              fontFamily: "monospace",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={copyToClipboard}
          >
            <Tooltip title="点击复制" placement="top">
              <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                {easingString}
              </Typography>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
