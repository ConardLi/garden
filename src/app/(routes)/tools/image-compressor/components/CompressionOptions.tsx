import { FC } from 'react';
import { Stack, Typography, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { CompressionOptions, OutputFormat } from '../utils';
import { OUTPUT_FORMATS } from '../utils';

interface CompressionSettingsProps {
  options: CompressionOptions;
  onChange: (options: CompressionOptions) => void;
}

const CompressionSettings: FC<CompressionSettingsProps> = ({ options, onChange }) => {
  const handleQualityChange = (_: Event, value: number | number[]) => {
    onChange({
      ...options,
      quality: value as number,
    });
  };

  const handleFormatChange = (_: React.MouseEvent<HTMLElement>, format: OutputFormat) => {
    if (format) {
      onChange({
        ...options,
        outputFormat: format,
      });
    }
  };

  const getQualityLabel = (value: number) => {
    if (value >= 0.8) return '高质量';
    if (value >= 0.5) return '中等质量';
    return '低质量';
  };

  return (
    <Stack spacing={3}>
      <div>
        <Typography gutterBottom>
          输出格式
        </Typography>
        <ToggleButtonGroup
          value={options.outputFormat}
          exclusive
          onChange={handleFormatChange}
          aria-label="输出格式"
          size="small"
          fullWidth
        >
          {OUTPUT_FORMATS.map((format) => (
            <ToggleButton key={format.value} value={format.value}>
              {format.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          提示：不同格式有不同的压缩效果和兼容性，WebP 通常是最佳选择
        </Typography>
      </div>

      <div>
        <Typography gutterBottom>
          压缩质量
        </Typography>
        <Slider
          value={options.quality}
          onChange={handleQualityChange}
          min={0.1}
          max={1}
          step={0.05}
          marks={[
            { value: 0.1, label: '最小' },
            { value: 0.5, label: '中等' },
            { value: 1, label: '最大' },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={value => `${(value * 100).toFixed(0)}% (${getQualityLabel(value)})`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          提示：质量越高，压缩后的文件越大，但图片清晰度越好
        </Typography>
      </div>
    </Stack>
  );
};

export default CompressionSettings; 