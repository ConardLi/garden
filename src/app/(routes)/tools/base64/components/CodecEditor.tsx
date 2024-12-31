import { FC, useRef } from 'react';
import {
  Stack,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Alert,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { CodecMode } from '../types';
import { isValidBase64 } from '../utils';

interface CodecEditorProps {
  input: string;
  output: string;
  mode: CodecMode;
  onInputChange: (value: string) => void;
  onModeChange: (mode: CodecMode) => void;
  onProcess: () => void;
  onSwap: () => void;
}

const CodecEditor: FC<CodecEditorProps> = ({
  input,
  output,
  mode,
  onInputChange,
  onModeChange,
  onProcess,
  onSwap,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (mode === 'encode') {
      // 文本文件直接读取
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onInputChange(content);
      };
      reader.readAsText(file);
    } else {
      // Base64 文件，先检查是否是有效的 Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (isValidBase64(content)) {
          onInputChange(content);
        } else {
          alert('无效的 Base64 文件');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (mode === 'decode' && !isValidBase64(text)) {
        alert('剪贴板内容不是有效的 Base64 字符串');
        return;
      }
      onInputChange(text);
    } catch (error) {
      console.error('粘贴失败:', error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight="medium">
            操作模式
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && onModeChange(newMode)}
            aria-label="编码模式"
            fullWidth
            size="large"
          >
            <ToggleButton value="encode" aria-label="编码">
              Base64 编码
            </ToggleButton>
            <ToggleButton value="decode" aria-label="解码">
              Base64 解码
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">
              {mode === 'encode' ? '输入文本' : 'Base64 字符串'}
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
            onChange={(e) => {
              const value = e.target.value;
              if (mode === 'decode' && value && !isValidBase64(value)) {
                // 可以选择在这里提示，或者在处理时才提示
              }
              onInputChange(value);
            }}
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 Base64 字符串...'}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '14px',
              },
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={onProcess}
            disabled={!input.trim() || (mode === 'decode' && !isValidBase64(input))}
            fullWidth
          >
            {mode === "encode" ? "编码" : "解码"}
          </Button>

          {output && (
            <Tooltip title="交换输入输出">
              <IconButton onClick={onSwap}>
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {mode === 'decode' && input && !isValidBase64(input) && (
          <Alert severity="error">
            输入的不是有效的 Base64 字符串
          </Alert>
        )}
      </Stack>

      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2">输出结果</Typography>
          {output && (
            <Tooltip title="复制结果">
              <IconButton size="small" onClick={() => handleCopy(output)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={6}
          value={output}
          placeholder="输出结果..."
          InputProps={{ readOnly: true }}
          sx={{
            '& .MuiInputBase-root': {
              fontFamily: 'monospace',
              fontSize: '14px',
              bgcolor: 'action.hover',
            },
          }}
        />
      </Stack>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </Stack>
  );
};

export default CodecEditor; 