"use client";

import React from 'react';
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { ChartConfig } from '../../types';

interface TitleConfigProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
}

const TitleConfig: React.FC<TitleConfigProps> = ({ config, onChange }) => {
  const handleChange = (path: string, value: any) => {
    const newConfig = { ...config };
    newConfig.title = {
      ...newConfig.title,
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
                checked={config.title?.show ?? true}
                onChange={(e) => handleChange('show', e.target.checked)}
              />
            }
            label="显示标题"
          />
        </Grid>
        
        {(config.title?.show ?? true) && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="主标题"
                value={config.title?.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="主标题颜色"
                  type="color"
                  value={config.title?.textStyle?.color || '#000000'}
                  onChange={(e) => {
                    const newConfig = { ...config };
                    newConfig.title = {
                      ...newConfig.title,
                      textStyle: {
                        ...newConfig.title?.textStyle,
                        color: e.target.value
                      }
                    };
                    onChange(newConfig);
                  }}
                  sx={{ '& input': { height: '50px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="主标题大小"
                  type="number"
                  value={config.title?.textStyle?.fontSize || 18}
                  onChange={(e) => {
                    const newConfig = { ...config };
                    newConfig.title = {
                      ...newConfig.title,
                      textStyle: {
                        ...newConfig.title?.textStyle,
                        fontSize: Number(e.target.value)
                      }
                    };
                    onChange(newConfig);
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="副标题"
                value={config.title?.subtext || ''}
                onChange={(e) => handleChange('subtext', e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="副标题颜色"
                  type="color"
                  value={config.title?.subtextStyle?.color || '#666666'}
                  onChange={(e) => {
                    const newConfig = { ...config };
                    newConfig.title = {
                      ...newConfig.title,
                      subtextStyle: {
                        ...newConfig.title?.subtextStyle,
                        color: e.target.value
                      }
                    };
                    onChange(newConfig);
                  }}
                  sx={{ '& input': { height: '50px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="副标题大小"
                  type="number"
                  value={config.title?.subtextStyle?.fontSize || 14}
                  onChange={(e) => {
                    const newConfig = { ...config };
                    newConfig.title = {
                      ...newConfig.title,
                      subtextStyle: {
                        ...newConfig.title?.subtextStyle,
                        fontSize: Number(e.target.value)
                      }
                    };
                    onChange(newConfig);
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="主标题字号"
                value={config.title?.textStyle?.fontSize || 18}
                onChange={(e) => handleChange('textStyle.fontSize', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="副标题字号"
                value={config.title?.subtextStyle?.fontSize || 14}
                onChange={(e) => handleChange('subtextStyle.fontSize', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="水平对齐"
                value={config.title?.left || 'auto'}
                onChange={(e) => handleChange('left', e.target.value)}
              >
                <MenuItem value="left">左对齐</MenuItem>
                <MenuItem value="center">居中</MenuItem>
                <MenuItem value="right">右对齐</MenuItem>
                <MenuItem value="auto">自动</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="垂直位置"
                value={config.title?.top || 'auto'}
                onChange={(e) => handleChange('top', e.target.value)}
              >
                <MenuItem value="top">顶部</MenuItem>
                <MenuItem value="middle">中部</MenuItem>
                <MenuItem value="bottom">底部</MenuItem>
                <MenuItem value="auto">自动</MenuItem>
              </TextField>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default TitleConfig;
