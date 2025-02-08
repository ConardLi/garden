"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
} from "@mui/material";
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

// 示例数据
const exampleData = {
  dimensions: ["指标", "预算分配", "实际开销"],
  source: [
    { 指标: "销售", 预算分配: 4200, 实际开销: 3000 },
    { 指标: "管理", 预算分配: 3000, 实际开销: 2800 },
    { 指标: "技术开发", 预算分配: 2000, 实际开销: 3200 },
    { 指标: "客服", 预算分配: 2800, 实际开销: 2600 },
    { 指标: "研发", 预算分配: 3500, 实际开销: 4000 },
    { 指标: "市场", 预算分配: 3000, 实际开销: 2500 },
  ],
};

// 默认配置
const defaultConfig: ChartConfig = {
  dataset: exampleData,
  title: {
    text: "雷达图示例",
    show: true,
  },
  radar: {
    indicator: [
      { name: "销售", max: 5000 },
      { name: "管理", max: 5000 },
      { name: "技术开发", max: 5000 },
      { name: "客服", max: 5000 },
      { name: "研发", max: 5000 },
      { name: "市场", max: 5000 },
    ],
  },
  legend: {
    show: true,
  },
  // series 将由数据自动生成
  animation: true,
};

export default function RadarChartPage() {
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
                  chartType="radar"
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
            showAxisConfig={true}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
