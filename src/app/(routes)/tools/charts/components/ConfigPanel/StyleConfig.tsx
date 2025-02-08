import React from 'react';
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ConfigPanelProps } from '../../types';

const StyleConfig: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  chartType,
}) => {
  const handleTitleChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...config,
      title: {
        ...config.title,
        [field]: event.target.value,
      },
    });
  };

  const handleGridChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...config,
      grid: {
        ...config.grid,
        [field]: event.target.value,
      },
    });
  };

  const handleWatermarkChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...config,
      graphic: [{
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: field === 'text' ? event.target.value : config.watermark?.text,
          fill: field === 'color' ? event.target.value : config.watermark?.color,
          fontSize: field === 'fontSize' 
            ? parseInt(event.target.value) 
            : config.watermark?.fontSize,
          opacity: 0.3,
        },
      }],
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        标题设置
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={config.title?.show ?? true}
                onChange={(e) =>
                  onChange({
                    ...config,
                    title: { ...config.title, show: e.target.checked },
                  })
                }
              />
            }
            label="显示标题"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="主标题"
            value={config.title?.text || ''}
            onChange={handleTitleChange('text')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="副标题"
            value={config.title?.subtext || ''}
            onChange={handleTitleChange('subtext')}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        网格设置
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={config.grid?.show ?? true}
                onChange={(e) =>
                  onChange({
                    ...config,
                    grid: { ...config.grid, show: e.target.checked },
                  })
                }
              />
            }
            label="显示网格"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="左边距"
            value={config.grid?.left || '10%'}
            onChange={handleGridChange('left')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="右边距"
            value={config.grid?.right || '10%'}
            onChange={handleGridChange('right')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="上边距"
            value={config.grid?.top || '60'}
            onChange={handleGridChange('top')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="下边距"
            value={config.grid?.bottom || '60'}
            onChange={handleGridChange('bottom')}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        水印设置
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="水印文字"
            value={config.watermark?.text || ''}
            onChange={handleWatermarkChange('text')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="水印颜色"
            type="color"
            value={config.watermark?.color || '#000000'}
            onChange={handleWatermarkChange('color')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="字体大小"
            type="number"
            value={config.watermark?.fontSize || 20}
            onChange={handleWatermarkChange('fontSize')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StyleConfig;
