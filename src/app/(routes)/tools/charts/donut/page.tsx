"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ChartConfig } from "../types";

// 动态导入组件以避免 SSR 问题
const ChartPreview = dynamic(() => import("../components/ChartPreview"), {
  ssr: false,
});
const ExportDialog = dynamic(() => import("../components/ExportDialog"), {
  ssr: false,
});
const DataConfig = dynamic(() => import("../components/ConfigPanel/DataConfig"), {
  ssr: false,
});
const ChartConfigurations = dynamic(() => import("../components/ChartConfigurations"), {
  ssr: false,
});

const defaultConfig: ChartConfig = {
  title: {
    show: true,
    text: "环形图示例",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  dataset: {
    dimensions: ["类别", "数值"],
    source: [
      { 类别: "搜索引擎", 数值: 1048 },
      { 类别: "直接访问", 数值: 735 },
      { 类别: "邮件营销", 数值: 580 },
      { 类别: "联盟广告", 数值: 484 },
      { 类别: "视频广告", 数值: 300 },
    ],
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: true,
      encode: {
        itemName: "类别",
        value: "数值",
      },
      label: {
        show: true,
        position: "outside",
        formatter: "{b}: {d}%",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: true,
      },
    },
  ],
  legend: {
    show: true,
    orient: "vertical",
    left: "left",
  },
  animation: true,
};

export default function DonutChartPage() {
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
                  chartType="donut"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* 下方：详细配置 */}
        <Grid item xs={12}>
          <ChartConfigurations
            config={config}
            onChange={handleConfigChange}
            showAxisConfig={false}
            chartType="donut"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
