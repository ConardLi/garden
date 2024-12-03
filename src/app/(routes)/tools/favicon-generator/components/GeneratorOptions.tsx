import { FC } from 'react';
import { Stack, Typography, Slider, Box, TextField } from '@mui/material';
import type { FaviconOptions } from '../utils';

interface GeneratorOptionsProps {
  options: FaviconOptions;
  onChange: (options: FaviconOptions) => void;
}

const GeneratorOptions: FC<GeneratorOptionsProps> = ({ options, onChange }) => {
  const handlePaddingChange = (_: Event, value: number | number[]) => {
    onChange({
      ...options,
      padding: value as number,
    });
  };

  const handleBorderRadiusChange = (_: Event, value: number | number[]) => {
    onChange({
      ...options,
      borderRadius: value as number,
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...options,
      backgroundColor: event.target.value,
    });
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          背景颜色
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: options.backgroundColor,
            }}
          />
          <TextField
            type="color"
            value={options.backgroundColor}
            onChange={handleColorChange}
            sx={{
              width: 120,
              '& input': {
                cursor: 'pointer',
                height: 48,
                p: 0,
              },
            }}
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          内边距
        </Typography>
        <Slider
          value={options.padding}
          onChange={handlePaddingChange}
          min={0}
          max={30}
          step={1}
          marks={[
            { value: 0, label: '0%' },
            { value: 15, label: '15%' },
            { value: 30, label: '30%' },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={value => `${value}%`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          调整图标与边框的距离
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          圆角
        </Typography>
        <Slider
          value={options.borderRadius}
          onChange={handleBorderRadiusChange}
          min={0}
          max={50}
          step={1}
          marks={[
            { value: 0, label: '0%' },
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={value => `${value}%`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          调整图标的圆角大小，50% 为圆形
        </Typography>
      </Box>
    </Stack>
  );
};

export default GeneratorOptions; 