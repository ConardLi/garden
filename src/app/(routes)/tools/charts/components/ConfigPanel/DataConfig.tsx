import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { ConfigPanelProps, ChartConfig } from "../../types";

// 生成 series 配置
const generateSeries = (
  dimensions: string[],
  type: string,
  config: ChartConfig
) => {
  // 如果是饼图类型，只生成一个 series
  if (type === "pie" || type === "donut") {
    return [
      {
        type: "pie",
        radius: type === "donut" ? ["40%", "70%"] : "50%",
        encode: {
          itemName: dimensions[0],
          value: dimensions[1],
        },
      },
    ];
  }

  // 如果是雷达图
  if (type === "radar") {
    return [
      {
        type: "radar",
        data: dimensions.slice(1).map((dim) => ({
          name: dim,
          value: config.dataset.source.map(item => item[dim]),
          areaStyle: {
            opacity: 0.3,
          },
        })),
        emphasis: {
          lineStyle: {
            width: 4,
          },
        },
      },
    ];
  }

  // 其他图表类型
  return dimensions.slice(1).map((dim) => ({
    type,
    name: dim,
    encode: {
      x: dimensions[0],
      y: dim,
    },
    ...(type === "line"
      ? {
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: {
            width: 2,
          },
        }
      : {
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
          },
        }),
  }));
};

const DataConfig: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  chartType,
}) => {
  const [dataMode, setDataMode] = React.useState("json");
  const [error, setError] = React.useState("");

  // 将 JSON 转换为 CSV
  const jsonToCsv = (data: any) => {
    if (!data || !data.dimensions || !data.source || data.source.length === 0) {
      return "";
    }
    const header = data.dimensions.join(",");
    const rows = data.source.map((item: any) => {
      return data.dimensions.map((dim: string) => item[dim]).join(",");
    });
    return [header, ...rows].join("\n");
  };

  // 初始化数据文本
  const [dataText, setDataText] = React.useState(() => {
    if (config.dataset) {
      // 如果没有 series，初始化时生成
      if (
        !config.series ||
        (Array.isArray(config.series) && config.series.length === 0)
      ) {
        onChange({
          ...config,
          series: generateSeries(config.dataset.dimensions, chartType, config),
          // 确保 legend 配置存在
          legend: {
            show: config.legend?.show ?? true,
            ...config.legend,
          },
        });
      }
      return dataMode === "json"
        ? JSON.stringify(config.dataset, null, 2)
        : jsonToCsv(config.dataset);
    }
    return "";
  });

  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setDataText(newText);

    try {
      let dimensions: string[] = [];
      let source: Record<string, any>[] = [];

      if (dataMode === "json") {
        const data = JSON.parse(newText);
        dimensions = data.dimensions;
        source = data.source;
      } else {
        // CSV 模式
        const lines = newText.trim().split("\n");
        dimensions = lines[0].split(",").map((d) => d.trim());
        source = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          return dimensions.reduce((obj, key, index) => {
            obj[key] = isNaN(Number(values[index]))
              ? values[index]
              : Number(values[index]);
            return obj;
          }, {} as Record<string, any>);
        });
      }

      setError("");

      // 生成新的配置
      const newDataset = { dimensions, source };
      const newConfig = {
        ...config,
        dataset: newDataset,
        series: generateSeries(dimensions, chartType, { ...config, dataset: newDataset }),
        // 确保 legend 配置存在
        legend: {
          show: config.legend?.show ?? true,
          ...config.legend,
        },
      };

      // 如果是雷达图，需要更新 indicator 配置
      if (chartType === 'radar') {
        const maxValues = {};
        source.forEach(item => {
          const category = item[dimensions[0]];
          dimensions.slice(1).forEach(dim => {
            maxValues[category] = Math.max(maxValues[category] || 0, item[dim]);
          });
        });

        newConfig.radar = {
          indicator: source.map(item => ({
            name: item[dimensions[0]],
            max: Math.ceil(maxValues[item[dimensions[0]]] * 1.2) // 给一个 20% 的空间
          }))
        };
      }

      onChange(newConfig);
    } catch (e) {
      setError(
        `数据格式无效，请输入有效的${dataMode === "json" ? "JSON" : "CSV"}格式`
      );
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>数据格式</InputLabel>
            <Select
              value={dataMode}
              onChange={(e) => {
                const newMode = e.target.value;
                setDataMode(newMode);
                try {
                  if (newMode === "csv" && dataText) {
                    // 从 JSON 转换为 CSV
                    const data = JSON.parse(dataText);
                    setDataText(jsonToCsv(data));
                    setError("");
                  } else if (newMode === "json" && dataText) {
                    // 从 CSV 转换为 JSON
                    const lines = dataText.trim().split("\n");
                    const dimensions = lines[0].split(",").map((d) => d.trim());
                    const source = lines.slice(1).map((line) => {
                      const values = line.split(",").map((v) => v.trim());
                      return dimensions.reduce((obj, key, index) => {
                        obj[key] = isNaN(Number(values[index]))
                          ? values[index]
                          : Number(values[index]);
                        return obj;
                      }, {} as Record<string, any>);
                    });
                    setDataText(
                      JSON.stringify({ dimensions, source }, null, 2)
                    );
                    setError("");
                  }
                } catch (e) {
                  setError("数据格式转换失败");
                }
              }}
              label="数据格式"
            >
              <MenuItem value="json">JSON</MenuItem>
              <MenuItem value="csv">CSV</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {dataMode === "json"
              ? "请输入 JSON 格式数据，包含 dimensions（维度）和 source（数据源）"
              : "请输入 CSV 格式数据，第一行为表头（维度），后续行为数据"}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={10}
            value={dataText}
            onChange={handleDataChange}
            error={!!error}
            helperText={error}
            placeholder={
              dataMode === "json"
                ? `{
  "dimensions": ["产品", "销量", "利润"],
  "source": [
    { "产品": "A产品", "销量": 120, "利润": 100 }
  ]
}`
                : "产品,销量,利润\nA产品,120,100\nB产品,200,150"
            }
          />
        </Grid>

        <Grid item xs={12}>
          {!error && dataText && (
            <Alert severity="success">数据格式正确，图表已更新</Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataConfig;
