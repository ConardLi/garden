import { FC } from 'react';
import { Stack, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { ImageFormat } from '../utils';

interface FormatSelectorProps {
  value: ImageFormat;
  onChange: (format: ImageFormat) => void;
}

const FormatSelector: FC<FormatSelectorProps> = ({ value, onChange }) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newFormat: ImageFormat | null,
  ) => {
    if (newFormat) {
      onChange(newFormat);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography gutterBottom>
        目标格式
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="图片格式"
        fullWidth
      >
        <ToggleButton value="PNG" aria-label="PNG">
          PNG
        </ToggleButton>
        <ToggleButton value="JPEG" aria-label="JPEG">
          JPEG
        </ToggleButton>
        <ToggleButton value="WEBP" aria-label="WEBP">
          WEBP
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="body2" color="text.secondary">
        {value === 'PNG' && '无损格式，适合需要透明背景的图片'}
        {value === 'JPEG' && '有损格式，适合照片，文件较小'}
        {value === 'WEBP' && '新一代格式，同等质量下体积更小'}
      </Typography>
    </Stack>
  );
};

export default FormatSelector; 