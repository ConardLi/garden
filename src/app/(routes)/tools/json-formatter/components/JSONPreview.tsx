import { FC } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReactJson from 'react-json-view';
import { StyledCard, StyledCardContent } from '../styles';

interface JSONPreviewProps {
  output: string;
  handleCopy: () => void;
}

const JSONPreview: FC<JSONPreviewProps> = ({ output, handleCopy }) => {
  const getJsonObject = () => {
    try {
      return output ? JSON.parse(output) : null;
    } catch {
      return null;
    }
  };

  return (
    <StyledCard>
      <StyledCardContent>
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">格式化结果</Typography>
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              disabled={!output}
            >
              复制
            </Button>
          </Stack>
          
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {getJsonObject() ? (
              <ReactJson
                src={getJsonObject()}
                theme="rjv-default"
                name={false}
                collapsed={2}
                displayDataTypes={false}
                enableClipboard={false}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                  height: '100%',
                }}
              />
            ) : (
              <Typography
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'grey.100',
                  height: '100%',
                  color: 'text.secondary',
                }}
              >
                格式化后的 JSON 将显示在这里...
              </Typography>
            )}
          </Box>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
};

export default JSONPreview; 