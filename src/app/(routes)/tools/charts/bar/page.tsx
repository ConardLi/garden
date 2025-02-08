"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ChartConfig } from "../types";

// 动态导入 ECharts 组件以避免 SSR 问题
const ChartPreview = dynamic(() => import("../components/ChartPreview"), {
  ssr: false,
});
const ExportDialog = dynamic(() => import("../components/ExportDialog"), {
  ssr: false,
});
const DataConfig = dynamic(
  () => import("../components/ConfigPanel/DataConfig"),
  {
    ssr: false,
  }
);
const TitleConfig = dynamic(
  () => import("../components/ConfigPanel/TitleConfig"),
  {
    ssr: false,
  }
);
const AxisConfig = dynamic(
  () => import("../components/ConfigPanel/AxisConfig"),
  {
    ssr: false,
  }
);
const ColorConfig = dynamic(
  () => import("../components/ConfigPanel/ColorConfig"),
  {
    ssr: false,
  }
);
const WatermarkConfig = dynamic(
  () => import("../components/ConfigPanel/WatermarkConfig"),
  {
    ssr: false,
  }
);
const AnimationConfig = dynamic(
  () => import("../components/ConfigPanel/AnimationConfig"),
  {
    ssr: false,
  }
);
const LegendConfig = dynamic(
  () => import("../components/ConfigPanel/LegendConfig"),
  {
    ssr: false,
  }
);

// 示例数据
const exampleData = {
  dimensions: ["category", "value"],
  source: [
    { category: "类别 A", value: 120 },
    { category: "类别 B", value: 200 },
    { category: "类别 C", value: 150 },
    { category: "类别 D", value: 80 },
    { category: "类别 E", value: 70 },
  ],
};

const defaultConfig: ChartConfig = {
  dataset: exampleData,
  title: {
    text: "柱状图",
    show: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
  // series 将由数据自动生成
  animation: true,
  animationDuration: 1000,
  animationEasing: "cubicOut",
};

export default function BarChartPage() {
  const [config, setConfig] = React.useState<ChartConfig>(defaultConfig);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);

  const handleConfigChange = (newConfig: ChartConfig) => {
    setConfig(newConfig);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* 左上方：图表预览 */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              height: "500px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ChartPreview config={config} />
          </Paper>
        </Grid>

        {/* 右上方：导出和数据配置 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "500px", overflow: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* 导出按钮 */}
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                onClick={() => setExportDialogOpen(true)}
                fullWidth
              >
                导出图表
              </Button>

              {/* 导出弹窗 */}
              <ExportDialog
                open={exportDialogOpen}
                onClose={() => setExportDialogOpen(false)}
                config={config}
              />

              {/* 数据配置 */}
              <Box>
                <DataConfig
                  config={config}
                  onChange={handleConfigChange}
                  chartType="bar"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* 下方：详细配置 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {/* 标题配置 */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>标题配置</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TitleConfig config={config} onChange={handleConfigChange} />
                </AccordionDetails>
              </Accordion>

              {/* 网格和坐标轴配置 */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>网格与坐标轴</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AxisConfig config={config} onChange={handleConfigChange} />
                </AccordionDetails>
              </Accordion>

              {/* 配色方案 */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>配色方案</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ColorConfig config={config} onChange={handleConfigChange} />
                </AccordionDetails>
              </Accordion>

              {/* 水印配置 */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>水印配置</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <WatermarkConfig
                    config={config}
                    onChange={handleConfigChange}
                  />
                </AccordionDetails>
              </Accordion>

              {/* 动画配置 */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>动画配置</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AnimationConfig
                    config={config}
                    onChange={handleConfigChange}
                    chartType="bar"
                  />
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
                    onChange={handleConfigChange}
                    chartType="bar"
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
