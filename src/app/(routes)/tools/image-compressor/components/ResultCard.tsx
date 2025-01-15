import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { CompressionResult } from "../utils";

interface ResultCardProps {
  result: CompressionResult;
}

const ResultCard: FC<ResultCardProps> = ({ result }) => (
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h6" gutterBottom>
      压缩完成！
    </Typography>
    <Typography variant="body1">
      原始大小: {result.original.toFixed(2)} MB
    </Typography>
    <Typography variant="body1">
      压缩后: {result.compressed.toFixed(2)} MB
    </Typography>
    <Typography variant="body1" color="primary">
      压缩率: {((1 - result.compressed / result.original) * 100).toFixed(1)}%
    </Typography>
  </Box>
);

export default ResultCard;
