import { FC } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { CompressionResult, OUTPUT_FORMATS } from "../utils";

interface ResultCardProps {
  result: CompressionResult;
}

const ResultCard: FC<ResultCardProps> = ({ result }) => {
  const formatLabel = OUTPUT_FORMATS.find(f => f.value === result.format)?.label || result.format.toUpperCase();
  
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        压缩完成！
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Chip
          label={`输出格式: ${formatLabel}`}
          color="primary"
          variant="outlined"
        />
      </Box>
      <Typography variant="body1">
        原始大小: {result.original.toFixed(2)} MB
      </Typography>
      <Typography variant="body1">
        压缩后: {result.compressed.toFixed(2)} MB
      </Typography>
      <Typography variant="body1" color="primary" sx={{ fontWeight: "bold" }}>
        压缩率: {((1 - result.compressed / result.original) * 100).toFixed(1)}%
      </Typography>
    </Box>
  );
};

export default ResultCard;
