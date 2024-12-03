import { FC } from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import type { ConversionResult } from '../utils';

interface ImagePreviewProps {
  result: ConversionResult;
}

const ImagePreview: FC<ImagePreviewProps> = ({ result }) => {
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          转换结果
        </Typography>
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              原始图片 ({result.original.format})
            </Typography>
            <Typography>
              {result.original.size.toFixed(2)} KB
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              转换后 ({result.converted.format})
            </Typography>
            <Typography>
              {result.converted.size.toFixed(2)} KB
            </Typography>
          </Box>
        </Stack>
        <Box
          component="img"
          src={result.converted.url}
          alt="预览"
          sx={{
            maxWidth: '100%',
            maxHeight: 300,
            objectFit: 'contain',
            borderRadius: 1,
          }}
        />
      </Stack>
    </Paper>
  );
};

export default ImagePreview; 