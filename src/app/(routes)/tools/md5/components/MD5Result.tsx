import { FC } from 'react';
import {
  Stack,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { MD5Options } from '../types';

interface MD5ResultProps {
  result: string;
  input: string;
  options: MD5Options;
}

const MD5Result: FC<MD5ResultProps> = ({
  result,
  input,
  options,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
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
          计算结果
        </Typography>
        {result && (
          <Tooltip title="复制结果">
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          minHeight: 60,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'action.hover',
        }}
      >
        {result || '等待计算...'}
      </Paper>

      {result && (
        <Typography variant="body2" color="text.secondary">
          {`长度: ${result.length} 字符`}
        </Typography>
      )}
    </Stack>
  );
};

export default MD5Result; 