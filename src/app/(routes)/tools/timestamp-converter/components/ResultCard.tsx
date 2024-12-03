import React from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { StyledCard, ResultContent } from '../styles';
import { ConversionResult } from '../types';

interface ResultCardProps {
  title: string;
  result: ConversionResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, result }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!result) {
    return (
      <StyledCard>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography color="text.secondary">
          请输入有效的值进行转换
        </Typography>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <ResultContent>
        {Object.entries(result).map(([key, value]) => (
          <div key={key} className="result-item">
            <div>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {key}
              </Typography>
              <Typography>{value}</Typography>
            </div>
            <Tooltip title="复制" placement="left">
              <IconButton
                size="small"
                onClick={() => handleCopy(value)}
                className="copy-button"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </ResultContent>
    </StyledCard>
  );
};

export default ResultCard;
