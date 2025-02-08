import React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { ConfigPanelProps, ChartConfig } from '../../types';

const ANIMATION_EASINGS = [
  'linear',
  'quadraticIn',
  'quadraticOut',
  'quadraticInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'quarticIn',
  'quarticOut',
  'quarticInOut',
  'quinticIn',
  'quinticOut',
  'quinticInOut',
  'sinusoidalIn',
  'sinusoidalOut',
  'sinusoidalInOut',
  'exponentialIn',
  'exponentialOut',
  'exponentialInOut',
  'circularIn',
  'circularOut',
  'circularInOut',
  'elasticIn',
  'elasticOut',
  'elasticInOut',
  'backIn',
  'backOut',
  'backInOut',
  'bounceIn',
  'bounceOut',
  'bounceInOut',
];

const AnimationConfig: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  chartType,
}) => {
  const handleAnimationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...config,
      animation: event.target.checked,
    });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...config,
      animationDuration: parseInt(event.target.value),
    });
  };

  const handleEasingChange = (event: SelectChangeEvent) => {
    onChange({
      ...config,
      animationEasing: event.target.value as ChartConfig['animationEasing'],
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        动画设置
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={config.animation ?? true}
                onChange={handleAnimationChange}
              />
            }
            label="启用动画"
          />
        </Grid>

        {config.animation && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="动画时长（毫秒）"
                value={config.animationDuration || 1000}
                onChange={handleDurationChange}
                inputProps={{ min: 0, step: 100 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>动画效果</InputLabel>
                <Select
                  value={config.animationEasing || 'cubicOut'}
                  onChange={handleEasingChange}
                  label="动画效果"
                >
                  {ANIMATION_EASINGS.map((easing) => (
                    <MenuItem key={easing} value={easing}>
                      {easing}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default AnimationConfig;
