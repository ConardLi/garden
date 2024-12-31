import { FC } from 'react';
import {
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import type { MD5Options as MD5OptionsType } from '../types';

interface MD5OptionsProps {
  options: MD5OptionsType;
  onOptionsChange: (options: MD5OptionsType) => void;
}

const MD5Options: FC<MD5OptionsProps> = ({
  options,
  onOptionsChange,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight="medium">
        选项设置
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={options.uppercase}
              onChange={(e) => onOptionsChange({
                ...options,
                uppercase: e.target.checked,
              })}
            />
          }
          label="大写输出"
        />

        <TextField
          label="迭代次数"
          type="number"
          size="small"
          value={options.iterations}
          onChange={(e) => onOptionsChange({
            ...options,
            iterations: Math.max(1, parseInt(e.target.value) || 1),
          })}
          sx={{ width: 120 }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="加盐值"
          value={options.salt}
          onChange={(e) => onOptionsChange({
            ...options,
            salt: e.target.value,
          })}
          placeholder="可选"
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>加盐位置</InputLabel>
          <Select
            value={options.saltPosition}
            label="加盐位置"
            onChange={(e) => onOptionsChange({
              ...options,
              saltPosition: e.target.value as MD5OptionsType['saltPosition'],
            })}
          >
            <MenuItem value="append">后置</MenuItem>
            <MenuItem value="prepend">前置</MenuItem>
            <MenuItem value="both">两端</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default MD5Options; 