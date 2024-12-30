import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import type { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight="medium">
        编程语言
      </Typography>
      <FormControl fullWidth>
        <InputLabel>选择语言</InputLabel>
        <Select
          value={language}
          label="选择语言"
          onChange={(e) => onLanguageChange(e.target.value as Language)}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default LanguageSelector; 