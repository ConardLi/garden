"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { GradientStop } from "../types";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useCallback } from "react";

interface GradientControlsProps {
  gradientStops: GradientStop[];
  setGradientStops: (stops: GradientStop[]) => void;
  gradientType: "linear" | "radial";
  setGradientType: (type: "linear" | "radial") => void;
  angle: number;
  setAngle: (angle: number) => void;
  gradientString: string;
}

export default function GradientControls({
  gradientStops,
  setGradientStops,
  gradientType,
  setGradientType,
  angle,
  setAngle,
  gradientString,
}: GradientControlsProps) {
  const handleColorChange = (index: number, color: string) => {
    const newStops = [...gradientStops];
    newStops[index] = { ...newStops[index], color };
    setGradientStops(newStops);
  };

  const handlePositionChange = (index: number, position: number) => {
    const newStops = [...gradientStops];
    newStops[index] = { ...newStops[index], position };
    setGradientStops(newStops);
  };

  const addGradientStop = () => {
    if (gradientStops.length < 5) {
      const position = Math.round(
        (gradientStops[gradientStops.length - 1].position +
          gradientStops[gradientStops.length - 2].position) /
          2
      );
      setGradientStops([
        ...gradientStops,
        { color: "#808080", position },
      ]);
    }
  };

  const removeGradientStop = (index: number) => {
    if (gradientStops.length > 2) {
      setGradientStops(gradientStops.filter((_, i) => i !== index));
    }
  };

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(gradientString);
  }, [gradientString]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            渐变类型
          </Typography>
          <ToggleButtonGroup
            value={gradientType}
            exclusive
            onChange={(_, value) => value && setGradientType(value)}
            size="small"
          >
            <ToggleButton value="linear">线性渐变</ToggleButton>
            <ToggleButton value="radial">径向渐变</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {gradientType === "linear" && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              角度: {angle}°
            </Typography>
            <Slider
              value={angle}
              onChange={(_, value) => setAngle(value as number)}
              min={0}
              max={360}
              valueLabelDisplay="auto"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            颜色停止点
          </Typography>
          {gradientStops.map((stop, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <input
                type="color"
                value={stop.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                style={{ width: 50, height: 50 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Slider
                  value={stop.position}
                  onChange={(_, value) =>
                    handlePositionChange(index, value as number)
                  }
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Box>
              {gradientStops.length > 2 && (
                <IconButton
                  onClick={() => removeGradientStop(index)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {gradientStops.length < 5 && (
            <Button
              startIcon={<AddIcon />}
              onClick={addGradientStop}
              variant="outlined"
              size="small"
            >
              添加颜色
            </Button>
          )}
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
                background: {gradientString};
              </Typography>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
