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
    text: "堆叠面积图示例",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  dataset: {
    dimensions: ["日期", "邮件营销", "联盟广告", "视频广告"],
    source: [
      { 日期: "周一", 邮件营销: 120, 联盟广告: 220, 视频广告: 150 },
      { 日期: "周二", 邮件营销: 132, 联盟广告: 182, 视频广告: 232 },
      { 日期: "周三", 邮件营销: 101, 联盟广告: 191, 视频广告: 201 },
      { 日期: "周四", 邮件营销: 134, 联盟广告: 234, 视频广告: 154 },
      { 日期: "周五", 邮件营销: 90, 联盟广告: 290, 视频广告: 190 },
      { 日期: "周六", 邮件营销: 230, 联盟广告: 330, 视频广告: 330 },
      { 日期: "周日", 邮件营销: 210, 联盟广告: 310, 视频广告: 410 },
    ],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "line",
      name: "邮件营销",
      stack: "总量",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      encode: {
        x: "日期",
        y: "邮件营销",
      },
    },
    {
      type: "line",
      name: "联盟广告",
      stack: "总量",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      encode: {
        x: "日期",
        y: "联盟广告",
      },
    },
    {
      type: "line",
      name: "视频广告",
      stack: "总量",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      encode: {
        x: "日期",
        y: "视频广告",
      },
    },
  ],
  legend: {
    show: true,
  },
  animation: true,
};

export default function StackedAreaChartPage() {
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
                  chartType="line"
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
