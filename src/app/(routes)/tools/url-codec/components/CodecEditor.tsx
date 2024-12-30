import { FC } from 'react';
import {
  Stack,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { EncodeMode } from '../utils';
import { getEncodeModeDescription } from '../utils';

interface CodecEditorProps {
  input: string;
  output: string;
  mode: "encode" | "decode";
  encodeMode: EncodeMode;
  onInputChange: (value: string) => void;
  onModeChange: (mode: "encode" | "decode") => void;
  onEncodeModeChange: (mode: EncodeMode) => void;
  onProcess: () => void;
  onSwap: () => void;
}

const CodecEditor: FC<CodecEditorProps> = ({
  input,
  output,
  mode,
  encodeMode,
  onInputChange,
  onModeChange,
  onEncodeModeChange,
  onProcess,
  onSwap,
}) => {
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
              URL 编码
            </ToggleButton>
            <ToggleButton value="decode" aria-label="解码">
              URL 解码
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="medium">
            编码方式
          </Typography>
          <ToggleButtonGroup
            value={encodeMode}
            exclusive
            onChange={(_, newMode) => newMode && onEncodeModeChange(newMode)}
            aria-label="编码类型"
            fullWidth
          >
            <ToggleButton 
              value="encodeURI" 
              aria-label="encodeURI"
              sx={{ flexDirection: 'column', py: 1 }}
            >
              <Typography variant="subtitle2">encodeURI</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                保留 URL 特殊字符
              </Typography>
            </ToggleButton>
            <ToggleButton 
              value="encodeURIComponent" 
              aria-label="encodeURIComponent"
              sx={{ flexDirection: 'column', py: 1 }}
            >
              <Typography variant="subtitle2">encodeURIComponent</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                编码所有特殊字符
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
            {getEncodeModeDescription(encodeMode)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={onProcess}
            disabled={!input.trim()}
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
      </Stack>

      <TextField
        fullWidth
        multiline
        rows={6}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={mode === "encode" ? "输入要编码的文本..." : "输入要解码的文本..."}
        sx={{
          '& .MuiInputBase-root': {
            fontFamily: 'monospace',
            fontSize: '14px',
          },
        }}
      />

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
  );
};

export default CodecEditor; 