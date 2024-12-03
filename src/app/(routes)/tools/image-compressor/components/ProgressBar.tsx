import { FC } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress variant="determinate" value={progress} />
    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
      压缩中... {Math.round(progress)}%
    </Typography>
  </Box>
);

export default ProgressBar; 