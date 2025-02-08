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
  Typography,
} from '@mui/material';
import { ChartConfig } from '../../types';

interface AxisConfigProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
}

const AxisConfig: React.FC<AxisConfigProps> = ({ config, onChange }) => {
  const handleGridChange = (path: string, value: any) => {
    const newConfig = { ...config };
    newConfig.grid = {
      ...newConfig.grid,
      [path]: value
    };
    onChange(newConfig);
  };

  const handleAxisChange = (axis: 'xAxis' | 'yAxis', path: string, value: any) => {
    const newConfig = { ...config };
    newConfig[axis] = {
      ...newConfig[axis],
      [path]: value
    };
    onChange(newConfig);
  };

  const handleAxisNestedChange = (axis: 'xAxis' | 'yAxis', nestedKey: string, path: string, value: any) => {
    const newConfig = { ...config };
    newConfig[axis] = {
      ...newConfig[axis],
      [nestedKey]: {
        ...newConfig[axis]?.[nestedKey],
        [path]: value
      }
    };
    onChange(newConfig);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {/* 网格配置 */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>网格配置</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={config.grid?.show ?? true}
                  onChange={(e) => handleGridChange('show', e.target.checked)}
                />
              }
              label="显示"
              sx={{ m: 0 }}
            />
          </Box>
        </Grid>

        {(config.grid?.show ?? true) && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="左边距"
                value={config.grid?.left || 10}
                onChange={(e) => handleGridChange('left', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="右边距"
                value={config.grid?.right || 10}
                onChange={(e) => handleGridChange('right', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="上边距"
                value={config.grid?.top || 60}
                onChange={(e) => handleGridChange('top', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="下边距"
                value={config.grid?.bottom || 10}
                onChange={(e) => handleGridChange('bottom', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        )}

        {/* X轴配置 */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>X轴配置</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={config.xAxis?.show ?? true}
                  onChange={(e) => handleAxisChange('xAxis', 'show', e.target.checked)}
                />
              }
              label="显示"
              sx={{ m: 0 }}
            />
          </Box>
        </Grid>

        {(config.xAxis?.show ?? true) && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ pl: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.xAxis?.axisLine?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('xAxis', 'axisLine', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="轴线"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.xAxis?.axisTick?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('xAxis', 'axisTick', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="刻度"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.xAxis?.axisLabel?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('xAxis', 'axisLabel', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="标签"
                  sx={{ m: 0 }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="X轴名称"
                value={config.xAxis?.name || ''}
                onChange={(e) => handleAxisChange('xAxis', 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="标签旋转角度"
                value={config.xAxis?.axisLabel?.rotate || 0}
                onChange={(e) => handleAxisNestedChange('xAxis', 'axisLabel', 'rotate', Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">°</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        )}

        {/* Y轴配置 */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>Y轴配置</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={config.yAxis?.show ?? true}
                  onChange={(e) => handleAxisChange('yAxis', 'show', e.target.checked)}
                />
              }
              label="显示"
              sx={{ m: 0 }}
            />
          </Box>
        </Grid>

        {(config.yAxis?.show ?? true) && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ pl: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.yAxis?.axisLine?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('yAxis', 'axisLine', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="轴线"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.yAxis?.axisTick?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('yAxis', 'axisTick', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="刻度"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.yAxis?.axisLabel?.show ?? true}
                      onChange={(e) => handleAxisNestedChange('yAxis', 'axisLabel', 'show', e.target.checked)}
                      size="small"
                    />
                  }
                  label="标签"
                  sx={{ m: 0 }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Y轴名称"
                value={config.yAxis?.name || ''}
                onChange={(e) => handleAxisChange('yAxis', 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Y轴位置"
                value={config.yAxis?.position || 'left'}
                onChange={(e) => handleAxisChange('yAxis', 'position', e.target.value)}
              >
                <MenuItem value="left">左侧</MenuItem>
                <MenuItem value="right">右侧</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AxisConfig;
