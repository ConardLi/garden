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

const defaultConfig: ChartConfig = {
  title: {
    show: true,
    text: "堆叠柱状图示例",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  dataset: {
    dimensions: ["产品", "成本", "收入", "利润"],
    source: [
      { 产品: "A产品", 成本: 120, 收入: 200, 利润: 80 },
      { 产品: "B产品", 成本: 180, 收入: 300, 利润: 120 },
      { 产品: "C产品", 成本: 150, 收入: 250, 利润: 100 },
      { 产品: "D产品", 成本: 200, 收入: 350, 利润: 150 },
    ],
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      name: "成本",
      stack: "total",
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
      },
      encode: {
        x: "产品",
        y: "成本",
      },
    },
    {
      type: "bar",
      name: "收入",
      stack: "total",
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
      },
      encode: {
        x: "产品",
        y: "收入",
      },
    },
    {
      type: "bar",
      name: "利润",
      stack: "total",
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
      },
      encode: {
        x: "产品",
        y: "利润",
      },
    },
  ],
  legend: {
    show: true,
  },
  animation: true,
};

export default function StackedBarChartPage() {
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
