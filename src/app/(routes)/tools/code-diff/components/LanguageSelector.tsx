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

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'yaml', label: 'YAML' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'sql', label: 'SQL' },
  { value: 'xml', label: 'XML' },
  { value: 'shell', label: 'Shell' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'dockerfile', label: 'Dockerfile' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'less', label: 'Less' },
  { value: 'scss', label: 'SCSS' },
] as const;

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