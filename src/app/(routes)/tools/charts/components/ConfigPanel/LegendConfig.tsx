import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { ChartConfig, ConfigPanelProps } from "../../types";

const LegendConfig = ({ config, onChange, chartType }: ConfigPanelProps) => {
  const handleConfigChange = (field: string, value: any) => {
    // 创建新的配置对象，确保深拷贝
    const newConfig = {
      ...config,
      legend: {
        ...config.legend,
        show: config.legend?.show ?? true,
      },
    };

    // 处理嵌套属性
    if (field === "textStyle") {
      newConfig.legend.textStyle = {
        ...newConfig.legend.textStyle,
        ...value,
      };
    } else {
      newConfig.legend[field] = value;
    }

    onChange(newConfig);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* 显示开关 */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={config.legend?.show ?? true}
                onChange={(e) => handleConfigChange("show", e.target.checked)}
              />
            }
            label="显示图例"
          />
        </Grid>

        {config.legend?.show && (
          <>
            {/* 位置设置 */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>方向</InputLabel>
                <Select
                  value={config.legend?.orient ?? "horizontal"}
                  label="方向"
                  onChange={(e) => handleConfigChange("orient", e.target.value)}
                >
                  <MenuItem value="horizontal">水平</MenuItem>
                  <MenuItem value="vertical">垂直</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>对齐方式</InputLabel>
                <Select
                  value={config.legend?.align ?? "auto"}
                  label="对齐方式"
                  onChange={(e) => handleConfigChange("align", e.target.value)}
                >
                  <MenuItem value="auto">自动</MenuItem>
                  <MenuItem value="left">左对齐</MenuItem>
                  <MenuItem value="right">右对齐</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* 位置微调 */}
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="上边距"
                value={config.legend?.top ?? ""}
                onChange={(e) => handleConfigChange("top", e.target.value)}
                placeholder="auto"
                helperText="支持数字或百分比"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="左边距"
                value={config.legend?.left ?? ""}
                onChange={(e) => handleConfigChange("left", e.target.value)}
                placeholder="auto"
                helperText="支持数字或百分比"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="右边距"
                value={config.legend?.right ?? ""}
                onChange={(e) => handleConfigChange("right", e.target.value)}
                placeholder="auto"
                helperText="支持数字或百分比"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="下边距"
                value={config.legend?.bottom ?? ""}
                onChange={(e) => handleConfigChange("bottom", e.target.value)}
                placeholder="auto"
                helperText="支持数字或百分比"
              />
            </Grid>

            {/* 图例项设置 */}
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="图例间隔"
                value={config.legend?.itemGap ?? 10}
                onChange={(e) =>
                  handleConfigChange("itemGap", Number(e.target.value))
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="图例宽度"
                value={config.legend?.itemWidth ?? 25}
                onChange={(e) =>
                  handleConfigChange("itemWidth", Number(e.target.value))
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="图例高度"
                value={config.legend?.itemHeight ?? 14}
                onChange={(e) =>
                  handleConfigChange("itemHeight", Number(e.target.value))
                }
              />
            </Grid>

            {/* 文字样式 */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                文字样式
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="字体大小"
                value={config.legend?.textStyle?.fontSize ?? 12}
                onChange={(e) =>
                  handleConfigChange("textStyle", {
                    fontSize: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="text"
                label="字体颜色"
                value={config.legend?.textStyle?.color ?? ""}
                onChange={(e) =>
                  handleConfigChange("textStyle", {
                    color: e.target.value,
                  })
                }
                placeholder="#333"
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel>字体粗细</InputLabel>
                <Select
                  value={config.legend?.textStyle?.fontWeight ?? "normal"}
                  label="字体粗细"
                  onChange={(e) =>
                    handleConfigChange("textStyle", {
                      fontWeight: e.target.value,
                    })
                  }
                >
                  <MenuItem value="normal">正常</MenuItem>
                  <MenuItem value="bold">粗体</MenuItem>
                  <MenuItem value="bolder">特粗</MenuItem>
                  <MenuItem value="lighter">细体</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LegendConfig;
