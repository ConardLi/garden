import { FC } from 'react';
import {
  Stack,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { GUIDOptions, GUIDFormat } from '../types';

interface GUIDGeneratorProps {
  options: GUIDOptions;
  onOptionsChange: (options: GUIDOptions) => void;
  onGenerate: () => void;
}

const FORMAT_DESCRIPTIONS = {
  N: {
    title: '32位数字格式',
    description: '32个连续的十六进制数字\n示例：00000000000000000000000000000000',
    example: '21EC2020-3AEA-4069-A2DD-08002B30309D'.replace(/-/g, ''),
  },
  D: {
    title: '标准格式（带连字符）',
    description: '标准的 GUID 格式，由连字符分隔的32个十六进制数字\n示例：00000000-0000-0000-0000-000000000000',
    example: '21EC2020-3AEA-4069-A2DD-08002B30309D',
  },
  B: {
    title: '带大括号格式',
    description: '在标准格式外添加大括号\n示例：{00000000-0000-0000-0000-000000000000}',
    example: '{21EC2020-3AEA-4069-A2DD-08002B30309D}',
  },
  P: {
    title: '带圆括号格式',
    description: '在标准格式外添加圆括号\n示例：(00000000-0000-0000-0000-000000000000)',
    example: '(21EC2020-3AEA-4069-A2DD-08002B30309D)',
  },
} as const;

const GUIDGenerator: FC<GUIDGeneratorProps> = ({
  options,
  onOptionsChange,
  onGenerate,
}) => {
  const handleFormatChange = (_: any, newFormat: GUIDFormat | null) => {
    if (newFormat) {
      onOptionsChange({ ...options, format: newFormat });
    }
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(1, Math.min(100, Number(event.target.value)));
    onOptionsChange({ ...options, count });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          GUID 格式
        </Typography>
        <ToggleButtonGroup
          value={options.format}
          exclusive
          onChange={handleFormatChange}
          aria-label="GUID 格式"
          fullWidth
          size="large"
        >
          <ToggleButton value="D" aria-label="标准格式">
            标准格式
          </ToggleButton>
          <ToggleButton value="N" aria-label="32位数字">
            32位数字
          </ToggleButton>
          <ToggleButton value="B" aria-label="带大括号">
            带大括号
          </ToggleButton>
          <ToggleButton value="P" aria-label="带圆括号">
            带圆括号
          </ToggleButton>
        </ToggleButtonGroup>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: 'background.default',
            borderRadius: 1,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight="medium" color="primary">
              {FORMAT_DESCRIPTIONS[options.format].title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {FORMAT_DESCRIPTIONS[options.format].description}
            </Typography>
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{ mt: 1 }}
            >
              {FORMAT_DESCRIPTIONS[options.format].example}
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          选项
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={options.uppercase}
                onChange={(e) =>
                  onOptionsChange({ ...options, uppercase: e.target.checked })
                }
              />
            }
            label="大写"
          />
        </Stack>

        <TextField
          label="生成数量"
          type="number"
          value={options.count}
          onChange={handleCountChange}
          inputProps={{ min: 1, max: 100 }}
          helperText="一次最多生成 100 个"
          sx={{ width: 200 }}
        />
      </Stack>

      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={onGenerate}
        size="large"
      >
        生成 GUID
      </Button>
    </Stack>
  );
};

export default GUIDGenerator; 