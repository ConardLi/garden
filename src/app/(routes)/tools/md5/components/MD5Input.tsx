import { FC, useRef } from 'react';
import {
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface MD5InputProps {
  input: string;
  onInputChange: (value: string) => void;
  onCalculate: () => void;
}

const MD5Input: FC<MD5InputProps> = ({
  input,
  onInputChange,
  onCalculate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onInputChange(content);
    };
    reader.readAsText(file);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onInputChange(text);
    } catch (error) {
      console.error('粘贴失败:', error);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" fontWeight="medium">
          输入文本
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="从剪贴板粘贴">
            <IconButton size="small" onClick={handlePaste}>
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="上传文件">
            <IconButton
              size="small"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        multiline
        rows={6}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="请输入要计算MD5的文本..."
      />

      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={onCalculate}
        disabled={!input.trim()}
        fullWidth
      >
        计算 MD5
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </Stack>
  );
};

export default MD5Input; 