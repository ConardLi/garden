"use client";

import { FC, useState, useCallback } from "react";
import { Stack, Divider } from "@mui/material";
import { CompressorContainer } from "./styles";
import type { CompressionOptions, CompressionResult } from "./utils";
import { compressImage, downloadFile } from "./utils";
import DropZone from "@/components/DropZone";
import ProgressBar from "./components/ProgressBar";
import ResultCard from "./components/ResultCard";
import CompressionSettings from "./components/CompressionOptions";

const ImageCompressor: FC = () => {
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [options, setOptions] = useState<CompressionOptions>({
    quality: 0.7,
  });

  const handleFileSelect = useCallback(
    async (file: File) => {
      setCompressing(true);
      setProgress(0);
      setResult(null);

      try {
        const compressionResult = await compressImage(
          file,
          options,
          setProgress
        );
        setResult(compressionResult);
        downloadFile(
          compressionResult.compressedFile,
          `compressed-${file.name}`
        );
      } catch (error) {
        console.error("压缩失败:", error);
      } finally {
        setCompressing(false);
      }
    },
    [options]
  );

  return (
    <Stack spacing={4}>
      <CompressorContainer elevation={0}>
        <Stack spacing={3}>
          <CompressionSettings options={options} onChange={setOptions} />
          <Divider />
          <DropZone onFileSelect={handleFileSelect} />
          {compressing && <ProgressBar progress={progress} />}
          {result && <ResultCard result={result} />}
        </Stack>
      </CompressorContainer>
    </Stack>
  );
};

export default ImageCompressor;
