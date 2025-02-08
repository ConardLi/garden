"use client";
import React from "react";
import {
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dynamic from "next/dynamic";
import { ChartConfig } from "../types";

// 动态导入配置组件
const TitleConfig = dynamic(
  () => import("./ConfigPanel/TitleConfig"),
  {
    ssr: false,
  }
);
const LegendConfig = dynamic(
  () => import("./ConfigPanel/LegendConfig"),
  {
    ssr: false,
  }
);
const AxisConfig = dynamic(
  () => import("./ConfigPanel/AxisConfig"),
  {
    ssr: false,
  }
);
const ColorConfig = dynamic(
  () => import("./ConfigPanel/ColorConfig"),
  {
    ssr: false,
  }
);
const WatermarkConfig = dynamic(
  () => import("./ConfigPanel/WatermarkConfig"),
  {
    ssr: false,
  }
);
const AnimationConfig = dynamic(
  () => import("./ConfigPanel/AnimationConfig"),
  {
    ssr: false,
  }
);

interface ChartConfigurationsProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
  showAxisConfig?: boolean;
  chartType?: string;
}

export default function ChartConfigurations({
  config,
  onChange,
  showAxisConfig = true,
  chartType,
}: ChartConfigurationsProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* 标题配置 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>标题配置</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TitleConfig config={config} onChange={onChange} />
          </AccordionDetails>
        </Accordion>

        {/* 图例配置 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>图例配置</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LegendConfig
              config={config}
              onChange={onChange}
              chartType={chartType}
            />
          </AccordionDetails>
        </Accordion>

        {/* 坐标轴配置 */}
        {showAxisConfig && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>坐标轴配置</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AxisConfig config={config} onChange={onChange} />
            </AccordionDetails>
          </Accordion>
        )}

        {/* 配色方案 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>配色方案</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ColorConfig config={config} onChange={onChange} />
          </AccordionDetails>
        </Accordion>

        {/* 水印配置 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>水印配置</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WatermarkConfig config={config} onChange={onChange} />
          </AccordionDetails>
        </Accordion>

        {/* 动画配置 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>动画配置</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AnimationConfig config={config} onChange={onChange} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}
