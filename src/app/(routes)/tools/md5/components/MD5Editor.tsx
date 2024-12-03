import { FC } from 'react';
import { Box, TextField, Typography, IconButton, Switch, FormControlLabel } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface MD5EditorProps {
  input: string;
  setInput: (value: string) => void;
  hash: string;
  isUpperCase: boolean;
  setIsUpperCase: (value: boolean) => void;
}

const MD5Editor: FC<MD5EditorProps> = ({
  input,
  setInput,
  hash,
  isUpperCase,
  setIsUpperCase,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入要生成 MD5 的文本..."
        sx={{ mb: 2 }}
      />
      
      <FormControlLabel
        control={
          <Switch
            checked={isUpperCase}
            onChange={(e) => setIsUpperCase(e.target.checked)}
          />
        }
        label="大写输出"
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          MD5 结果：{hash || '等待输入...'}
        </Typography>
        {hash && (
          <IconButton onClick={handleCopy} size="small">
            <ContentCopyIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default MD5Editor; 