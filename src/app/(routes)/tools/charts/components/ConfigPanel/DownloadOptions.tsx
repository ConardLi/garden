import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { ConfigPanelProps } from '../../types';

interface DownloadOptionsProps {
  config: ConfigPanelProps['config'];
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ config }) => {
  const [imageType, setImageType] = React.useState('png');
  const [imageWidth, setImageWidth] = React.useState('1920');
  const [imageHeight, setImageHeight] = React.useState('1080');

  const handleDownloadStatic = () => {
    // 获取 echarts 实例并导出图片
    const chart = document.querySelector('.echarts-for-react canvas');
    if (chart) {
      const link = document.createElement('a');
      link.download = `chart.${imageType}`;
      link.href = (chart as HTMLCanvasElement).toDataURL(`image/${imageType}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        导出选项
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>图片格式</InputLabel>
            <Select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              label="图片格式"
            >
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpeg">JPEG</MenuItem>
              <MenuItem value="webp">WebP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="宽度"
            value={imageWidth}
            onChange={(e) => setImageWidth(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="高度"
            value={imageHeight}
            onChange={(e) => setImageHeight(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleDownloadStatic}
            fullWidth
          >
            下载图片
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DownloadOptions;
