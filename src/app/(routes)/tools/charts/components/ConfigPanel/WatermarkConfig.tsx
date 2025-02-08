"use client";

import React from 'react';
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  InputAdornment,
  Slider,
  Typography,
} from '@mui/material';
import { ChartConfig } from '../../types';

interface WatermarkConfigProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
}

const WatermarkConfig: React.FC<WatermarkConfigProps> = ({ config, onChange }) => {
  const handleChange = (path: string, value: any) => {
    const newConfig = { ...config };
    newConfig.watermark = {
      ...newConfig.watermark,
      [path]: value
    };
    onChange(newConfig);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={config.watermark?.show ?? false}
                onChange={(e) => handleChange('show', e.target.checked)}
              />
            }
            label="显示水印"
          />
        </Grid>

        {(config.watermark?.show ?? false) && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="水印文字"
                value={config.watermark?.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="字体大小"
                value={config.watermark?.fontSize || 14}
                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="字体颜色"
                type="color"
                value={config.watermark?.color || '#000000'}
                onChange={(e) => handleChange('color', e.target.value)}
                sx={{
                  '& input[type="color"]': {
                    p: 0.5,
                    width: '100%',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, width: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>透明度</Typography>
                  <Slider
                    value={config.watermark?.opacity || 0.2}
                    onChange={(_, value) => handleChange('opacity', value)}
                    step={0.1}
                    marks
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, width: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>密度</Typography>
                  <Slider
                    value={config.watermark?.density || 2}
                    onChange={(_, value) => handleChange('density', value)}
                    step={1}
                    marks={[
                      { value: 1, label: '稀疏' },
                      { value: 3, label: '适中' },
                      { value: 5, label: '密集' }
                    ]}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, width: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>旋转角度</Typography>
                  <Slider
                    value={config.watermark?.rotate || -30}
                    onChange={(_, value) => handleChange('rotate', value)}
                    step={5}
                    marks={[
                      { value: -90, label: '-90°' },
                      { value: 0, label: '0°' },
                      { value: 90, label: '90°' }
                    ]}
                    min={-90}
                    max={90}
                    valueLabelDisplay="auto"
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default WatermarkConfig;
