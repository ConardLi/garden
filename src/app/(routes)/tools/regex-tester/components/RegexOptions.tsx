import { FC } from 'react';
import {
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Tooltip,
} from '@mui/material';

interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
}

interface RegexOptionsProps {
  flags: RegexFlags;
  onFlagsChange: (flags: RegexFlags) => void;
}

const FLAG_OPTIONS = [
  { key: 'global', label: '全局匹配 (g)', tooltip: '查找所有匹配项' },
  { key: 'ignoreCase', label: '忽略大小写 (i)', tooltip: '不区分大小写' },
  { key: 'multiline', label: '多行匹配 (m)', tooltip: '多行模式' },
  { key: 'dotAll', label: '点号匹配所有 (s)', tooltip: '允许.匹配换行符' },
  { key: 'unicode', label: 'Unicode (u)', tooltip: 'Unicode模式' },
  { key: 'sticky', label: '粘性匹配 (y)', tooltip: '从上次匹配位置开始' },
] as const;

const RegexOptions: FC<RegexOptionsProps> = ({ flags, onFlagsChange }) => {
  const handleChange = (key: keyof RegexFlags) => {
    onFlagsChange({
      ...flags,
      [key]: !flags[key],
    });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight="medium">
        正则选项
      </Typography>
      <FormGroup row>
        {FLAG_OPTIONS.map(({ key, label, tooltip }) => (
          <Tooltip key={key} title={tooltip}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags[key as keyof RegexFlags]}
                  onChange={() => handleChange(key as keyof RegexFlags)}
                />
              }
              label={label}
            />
          </Tooltip>
        ))}
      </FormGroup>
    </Stack>
  );
};

export default RegexOptions; 