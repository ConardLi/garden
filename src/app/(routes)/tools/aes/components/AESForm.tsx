import { FC } from 'react';
import {
  Stack,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Alert,
  Paper,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import type { AESOptions, AESMode, CipherMode, PaddingMode, KeySize, Encoding } from '../types';
import { generateRandomKey, generateRandomIV } from '../utils';

interface AESFormProps {
  input: string;
  output: string;
  error: string | null;
  mode: AESMode;
  options: AESOptions;
  onInputChange: (value: string) => void;
  onModeChange: (mode: AESMode) => void;
  onOptionsChange: (options: AESOptions) => void;
  onProcess: () => void;
}

const MODE_DESCRIPTIONS = {
  CBC: {
    title: 'CBC (密码分组链接)',
    description: '最常用的模式，需要 IV，提供较好的安全性。每个分组的加密依赖于前一个分组，能够抵抗重放攻击。',
  },
  ECB: {
    title: 'ECB (电子密码本)',
    description: '最简单的模式，不需要 IV，但安全性较低。相同的明文分组会产生相同的密文分组。',
  },
  CFB: {
    title: 'CFB (密码反馈)',
    description: '将分组密码转换为流密码，需要 IV。每个分组的加密依赖于前一个密文分组。',
  },
  OFB: {
    title: 'OFB (输出反馈)',
    description: '将分组密码转换为流密码，需要 IV。加密和解密操作相同，适合对流数据进行加密。',
  },
  CTR: {
    title: 'CTR (计数器)',
    description: '将分组密码转换为流密码，需要 IV。每个分组使用递增的计数器进行加密，支持并行处理。',
  },
} as const;

const AESForm: FC<AESFormProps> = ({
  input,
  output,
  error,
  mode,
  options,
  onInputChange,
  onModeChange,
  onOptionsChange,
  onProcess,
}) => {
  const handleModeChange = (_: any, newMode: AESMode | null) => {
    if (newMode) {
      onModeChange(newMode);
    }
  };

  const handleCipherModeChange = (event: any) => {
    const newMode = event.target.value as CipherMode;
    onOptionsChange({ ...options, mode: newMode });
  };

  const handlePaddingChange = (event: any) => {
    onOptionsChange({ ...options, padding: event.target.value as PaddingMode });
  };

  const handleKeySizeChange = (event: any) => {
    onOptionsChange({ ...options, keySize: event.target.value as KeySize });
  };

  const handleEncodingChange = (event: any) => {
    onOptionsChange({ ...options, encoding: event.target.value as Encoding });
  };

  const handleGenerateKey = () => {
    const newKey = generateRandomKey(options.keySize);
    onOptionsChange({ ...options, key: newKey });
  };

  const handleGenerateIV = () => {
    const newIV = generateRandomIV();
    onOptionsChange({ ...options, iv: newIV });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onInputChange(text);
    } catch (error) {
      console.error('粘贴失败:', error);
    }
  };

  const handleSwap = () => {
    if (output) {
      onInputChange(output);
      onModeChange(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          操作模式
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="加密模式"
          fullWidth
          size="large"
        >
          <ToggleButton value="encrypt" aria-label="加密">
            加密
          </ToggleButton>
          <ToggleButton value="decrypt" aria-label="解密">
            解密
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          加密选项
        </Typography>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>加密模式</InputLabel>
            <Select
              value={options.mode}
              onChange={handleCipherModeChange}
              label="加密模式"
            >
              <MenuItem value="CBC">CBC</MenuItem>
              <MenuItem value="ECB">ECB</MenuItem>
              <MenuItem value="CFB">CFB</MenuItem>
              <MenuItem value="OFB">OFB</MenuItem>
              <MenuItem value="CTR">CTR</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>填充方式</InputLabel>
            <Select
              value={options.padding}
              onChange={handlePaddingChange}
              label="填充方式"
            >
              <MenuItem value="PKCS7">PKCS7</MenuItem>
              <MenuItem value="ZeroPadding">Zero Padding</MenuItem>
              <MenuItem value="NoPadding">No Padding</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>密钥长度</InputLabel>
            <Select
              value={options.keySize}
              onChange={handleKeySizeChange}
              label="密钥长度"
            >
              <MenuItem value={128}>128 位</MenuItem>
              <MenuItem value={192}>192 位</MenuItem>
              <MenuItem value={256}>256 位</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>输出编码</InputLabel>
            <Select
              value={options.encoding}
              onChange={handleEncodingChange}
              label="输出编码"
            >
              <MenuItem value="base64">Base64</MenuItem>
              <MenuItem value="hex">Hex</MenuItem>
              <MenuItem value="utf8">UTF-8</MenuItem>
            </Select>
          </FormControl>
        </Stack>

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
              {MODE_DESCRIPTIONS[options.mode].title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {MODE_DESCRIPTIONS[options.mode].description}
            </Typography>
          </Stack>
        </Paper>

        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="密钥"
              value={options.key}
              onChange={(e) => onOptionsChange({ ...options, key: e.target.value })}
              InputProps={{
                endAdornment: (
                  <Tooltip title="生成随机密钥">
                    <IconButton onClick={handleGenerateKey}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
            {options.mode !== 'ECB' && (
              <TextField
                fullWidth
                label="IV"
                value={options.iv}
                onChange={(e) => onOptionsChange({ ...options, iv: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="生成随机 IV">
                      <IconButton onClick={handleGenerateIV}>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">
              {mode === 'encrypt' ? '输入文本' : '密文'}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="从剪贴板粘贴">
                <IconButton size="small" onClick={handlePaste}>
                  <ContentPasteIcon />
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
            placeholder={mode === 'encrypt' ? '输入要加密的文本...' : '输入要解密的密文...'}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={onProcess}
            disabled={!input.trim() || !options.key}
            fullWidth
          >
            {mode === "encrypt" ? "加密" : "解密"}
          </Button>

          {output && (
            <Tooltip title="交换输入输出">
              <IconButton onClick={handleSwap}>
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {output && (
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
                {mode === 'encrypt' ? '密文' : '解密结果'}
              </Typography>
              <Tooltip title="复制结果">
                <IconButton size="small" onClick={() => handleCopy(output)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <TextField
              fullWidth
              multiline
              rows={6}
              value={output}
              InputProps={{ readOnly: true }}
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'action.hover',
                },
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default AESForm; 