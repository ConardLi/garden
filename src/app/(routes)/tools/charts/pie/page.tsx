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
  dimensions: ["类别", "数值"],
  source: [
    { 类别: "直接访问", 数值: 335 },
    { 类别: "邮件营销", 数值: 234 },
    { 类别: "联盟广告", 数值: 135 },
    { 类别: "视频广告", 数值: 148 },
    { 类别: "搜索引擎", 数值: 548 },
  ],
};

// 默认配置
const defaultConfig: ChartConfig = {
  dataset: exampleData,
  title: {
    text: "饼图示例",
    show: true,
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: true,
  },
  // series 将由数据自动生成
  animation: true,
};

export default function PieChartPage() {
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
                  chartType="pie"
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
          />
        </Grid>
      </Grid>
    </Container>
  );
}
