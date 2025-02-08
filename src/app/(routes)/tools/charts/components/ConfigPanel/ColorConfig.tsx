"use client";

import React from 'react';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ChartConfig } from '../../types';

interface ColorConfigProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
}

const defaultPalette = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
];

const ColorConfig: React.FC<ColorConfigProps> = ({ config, onChange }) => {
  const handleColorChange = (index: number, color: string) => {
    const newConfig = { ...config };
    const colors = [...(newConfig.color || defaultPalette)];
    colors[index] = color;
    newConfig.color = colors;
    onChange(newConfig);
  };

  const addColor = () => {
    const newConfig = { ...config };
    const colors = [...(newConfig.color || defaultPalette)];
    newConfig.color = [...colors, '#000000'];
    onChange(newConfig);
  };

  const removeColor = (index: number) => {
    const newConfig = { ...config };
    if (!newConfig.color || newConfig.color.length <= 1) return;
    newConfig.color = newConfig.color.filter((_, i) => i !== index);
    onChange(newConfig);
  };

  const resetColors = () => {
    const newConfig = { ...config };
    newConfig.color = [...defaultPalette];
    onChange(newConfig);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="背景颜色"
            type="color"
            value={config.backgroundColor || '#ffffff'}
            onChange={(e) => {
              const newConfig = { ...config };
              newConfig.backgroundColor = e.target.value;
              onChange(newConfig);
            }}
            sx={{ '& input': { height: '50px' }, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              图表配色
            </Typography>
            <IconButton onClick={resetColors} color="primary" size="small" sx={{ mr: 1 }} title="重置为默认配色">
              <RestartAltIcon />
            </IconButton>
            <IconButton onClick={addColor} color="primary" size="small" title="添加颜色">
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
        
        {(config.color || defaultPalette).map((color, index) => (
          <Grid item xs={6} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                sx={{
                  '& input[type="color"]': {
                    p: 0.5,
                    width: '100%',
                    height: '40px'
                  },
                }}
              />
              <IconButton
                onClick={() => removeColor(index)}
                color="error"
                size="small"
                disabled={!config.color || config.color.length <= 1}
                title="删除颜色"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorConfig;
