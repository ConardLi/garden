"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import EasingPreview from "./components/EasingPreview";
import EasingControls from "./components/EasingControls";
import BezierEditor from "./components/BezierEditor";
import { EasingConfig } from "./types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function EasingWizard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [config, setConfig] = useState<EasingConfig>({
    p1: { x: 0.66, y: 0 },
    p2: { x: 0.34, y: 1 },
    duration: 2,
    direction: "horizontal",
  });

  const [compareMode, setCompareMode] = useState(false);
  const [compareConfig, setCompareConfig] = useState<EasingConfig | null>(null);

  const easingString = `cubic-bezier(${config.p1.x}, ${config.p1.y}, ${config.p2.x}, ${config.p2.y})`;
  const compareEasingString = compareConfig
    ? `cubic-bezier(${compareConfig.p1.x}, ${compareConfig.p1.y}, ${compareConfig.p2.x}, ${compareConfig.p2.y})`
    : "";

  const handleCompareToggle = useCallback(() => {
    if (!compareMode) {
      setCompareConfig({ ...config });
    } else {
      setCompareConfig(null);
    }
    setCompareMode(!compareMode);
  }, [compareMode, config]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <Typography variant="h5" component="h1">
          缓动曲线编辑器
        </Typography>
        <Tooltip title="对比模式">
          <IconButton
            onClick={handleCompareToggle}
            color={compareMode ? "primary" : "default"}
          >
            <CompareArrowsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="通过调整贝塞尔曲线来创建自定义的动画缓动效果。拖动控制点来修改曲线形状，或使用预设值快速应用常用的动画效果。">
          <IconButton size="small" color="info">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
          mb: 4,
        }}
      >
        <Paper elevation={3} sx={{ flex: 1 }}>
          <Box sx={{ position: "relative" }}>
            <EasingPreview
              easingString={easingString}
              compareEasingString={compareEasingString}
              config={compareMode && compareConfig ? compareConfig : config}
              compareMode={compareMode}
            />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
          <BezierEditor
            config={compareMode && compareConfig ? compareConfig : config}
            onChange={
              compareMode && compareConfig ? setCompareConfig : setConfig
            }
          />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <EasingControls
            config={compareMode && compareConfig ? compareConfig : config}
            setConfig={
              compareMode && compareConfig ? setCompareConfig : setConfig
            }
            easingString={compareMode ? compareEasingString : easingString}
            compareMode={compareMode}
          />
        </Paper>
      </Box>
    </Container>
  );
}
