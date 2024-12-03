import React from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledCard } from '../styles';

interface TimestampSectionProps {
  timestamp: string;
  onTimestampChange: (value: string) => void;
  onGetCurrent: () => void;
}

const TimestampSection: React.FC<TimestampSectionProps> = ({
  timestamp,
  onTimestampChange,
  onGetCurrent,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(timestamp);
  };

  return (
    <StyledCard>
      <Typography variant="h6" component="h2" gutterBottom>
        时间戳
      </Typography>
      
      <TextField
        fullWidth
        label="输入时间戳"
        value={timestamp}
        onChange={(e) => onTimestampChange(e.target.value)}
        placeholder="支持10位秒级或13位毫秒级时间戳"
        InputProps={{
          endAdornment: timestamp && (
            <InputAdornment position="end">
              <Tooltip title="复制">
                <IconButton onClick={handleCopy} edge="end">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="outlined"
        startIcon={<AccessTimeIcon />}
        onClick={onGetCurrent}
      >
        获取当前时间戳
      </Button>
    </StyledCard>
  );
};

export default TimestampSection;
