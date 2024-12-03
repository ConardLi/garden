import { FC } from 'react';
import { Stack, Typography, Slider, Box } from '@mui/material';
import type { ImageFormat } from '../utils';

interface QualitySliderProps {
  format: ImageFormat;
  quality: number;
  onChange: (quality: number) => void;
}

const QualitySlider: FC<QualitySliderProps> = ({ format, quality, onChange }) => {
  if (format === 'PNG') return null;

  const handleChange = (_: Event, value: number | number[]) => {
    onChange(value as number);
  };

  const getQualityDescription = (value: number) => {
    if (value >= 0.8) return '推荐用于需要高清晰度的图片';
    if (value >= 0.5) return '适合大多数场景，平衡大小和质量';
    return '文件最小，但可能影响图片质量';
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          图片质量
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format === 'JPEG' ? '调整 JPEG 压缩质量' : 'WEBP 格式压缩质量'}
        </Typography>
      </Box>
      
      <Slider
        value={quality}
        onChange={handleChange}
        min={0.1}
        max={1}
        step={0.1}
        marks={[
          { 
            value: 0.1, 
            label: <Typography variant="caption" sx={{ opacity: 0.7 }}>10%</Typography> 
          },
          { 
            value: 0.5, 
            label: <Typography variant="caption" sx={{ opacity: 0.85 }}>50%</Typography> 
          },
          { 
            value: 1, 
            label: <Typography variant="caption">100%</Typography> 
          },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={value => `${(value * 100).toFixed(0)}%`}
        sx={{
          '& .MuiSlider-markLabel': {
            fontSize: '0.75rem',
          },
          '& .MuiSlider-valueLabel': {
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
          },
        }}
      />

      <Box sx={{ mt: 1 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            borderLeft: '2px solid',
            borderColor: 'primary.main',
            pl: 1,
            py: 0.5,
          }}
        >
          {getQualityDescription(quality)}
        </Typography>
      </Box>

      <Typography 
        variant="caption" 
        color="text.secondary"
        sx={{ 
          mt: 1,
          backgroundColor: 'action.hover',
          px: 1.5,
          py: 1,
          borderRadius: 1,
        }}
      >
        {format === 'JPEG' && '提示：JPEG 格式推荐使用 70%-90% 的质量以平衡大小和清晰度'}
        {format === 'WEBP' && '提示：WEBP 格式在相同质量下通常比 JPEG 更小'}
      </Typography>
    </Stack>
  );
};

export default QualitySlider; 