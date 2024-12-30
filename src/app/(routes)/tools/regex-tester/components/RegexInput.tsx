import { FC } from 'react';
import {
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { REGEX_TEMPLATES } from '../constants';
import { useState } from 'react';

interface RegexInputProps {
  pattern: string;
  text: string;
  onPatternChange: (value: string) => void;
  onTextChange: (value: string) => void;
}

const RegexInput: FC<RegexInputProps> = ({
  pattern,
  text,
  onPatternChange,
  onTextChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTemplateSelect = (template: typeof REGEX_TEMPLATES[0]) => {
    onPatternChange(template.pattern);
    onTextChange(template.example);
    handleClose();
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" fontWeight="medium">
            正则表达式
          </Typography>
          <Button
            size="small"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
          >
            常用正则
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: 400,
              },
            }}
          >
            {REGEX_TEMPLATES.map((template) => (
              <MenuItem
                key={template.name}
                onClick={() => handleTemplateSelect(template)}
              >
                <ListItemText
                  primary={template.name}
                  secondary={template.description}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(template.pattern);
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <TextField
          fullWidth
          value={pattern}
          onChange={(e) => onPatternChange(e.target.value)}
          placeholder="请输入正则表达式，如：/[1-9]\d*/"
          InputProps={{
            startAdornment: <InputAdornment position="start">/</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => navigator.clipboard.writeText(pattern)}
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight="medium">
          测试文本
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="请输入要验证的文本..."
        />
      </Stack>
    </Stack>
  );
};

export default RegexInput; 