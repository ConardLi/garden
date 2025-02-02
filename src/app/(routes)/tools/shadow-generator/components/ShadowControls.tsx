"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ShadowConfig, ShadowPreset } from "../types";
import { useCallback } from "react";

const presets: ShadowPreset[] = [
  {
    name: "浮起",
    config: {
      offsetX: 0,
      offsetY: 4,
      blur: 8,
      spread: 0,
      color: "rgba(0,0,0,0.1)",
      inset: false,
    },
  },
  {
    name: "深度",
    config: {
      offsetX: 0,
      offsetY: 8,
      blur: 24,
      spread: -8,
      color: "rgba(0,0,0,0.15)",
      inset: false,
    },
  },
  {
    name: "内嵌",
    config: {
      offsetX: 2,
      offsetY: 2,
      blur: 4,
      spread: 0,
      color: "rgba(0,0,0,0.1)",
      inset: true,
    },
  },
];

interface ShadowControlsProps {
  shadows: ShadowConfig[];
  setShadows: (shadows: ShadowConfig[]) => void;
  shadowString: string;
}

export default function ShadowControls({
  shadows,
  setShadows,
  shadowString,
}: ShadowControlsProps) {
  const handleShadowChange = (index: number, key: keyof ShadowConfig, value: any) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], [key]: value };
    setShadows(newShadows);
  };

  const addShadow = () => {
    if (shadows.length < 3) {
      setShadows([
        ...shadows,
        {
          offsetX: 5,
          offsetY: 5,
          blur: 10,
          spread: 0,
          color: "rgba(0,0,0,0.2)",
          inset: false,
        },
      ]);
    }
  };

  const removeShadow = (index: number) => {
    setShadows(shadows.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: ShadowPreset) => {
    setShadows([preset.config]);
  };

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(`box-shadow: ${shadowString};`);
  }, [shadowString]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            预设
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
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

        {shadows.map((shadow, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                position: "relative",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                阴影 {index + 1}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>水平偏移: {shadow.offsetX}px</Typography>
                  <Slider
                    value={shadow.offsetX}
                    onChange={(_, value) =>
                      handleShadowChange(index, "offsetX", value as number)
                    }
                    min={-50}
                    max={50}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>垂直偏移: {shadow.offsetY}px</Typography>
                  <Slider
                    value={shadow.offsetY}
                    onChange={(_, value) =>
                      handleShadowChange(index, "offsetY", value as number)
                    }
                    min={-50}
                    max={50}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>模糊: {shadow.blur}px</Typography>
                  <Slider
                    value={shadow.blur}
                    onChange={(_, value) =>
                      handleShadowChange(index, "blur", value as number)
                    }
                    min={0}
                    max={100}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>扩散: {shadow.spread}px</Typography>
                  <Slider
                    value={shadow.spread}
                    onChange={(_, value) =>
                      handleShadowChange(index, "spread", value as number)
                    }
                    min={-50}
                    max={50}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      type="color"
                      value={shadow.color}
                      onChange={(e) =>
                        handleShadowChange(index, "color", e.target.value)
                      }
                      style={{ width: 50, height: 50 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography>内阴影</Typography>
                      <Switch
                        checked={shadow.inset}
                        onChange={(e) =>
                          handleShadowChange(index, "inset", e.target.checked)
                        }
                      />
                    </Box>
                    {shadows.length > 1 && (
                      <IconButton
                        onClick={() => removeShadow(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}

        {shadows.length < 3 && (
          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={addShadow}
              variant="outlined"
              size="small"
            >
              添加阴影
            </Button>
          </Grid>
        )}

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
                box-shadow: {shadowString};
              </Typography>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
