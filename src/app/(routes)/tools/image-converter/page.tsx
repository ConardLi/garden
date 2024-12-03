"use client";

import { FC, useState, useCallback } from "react";
import { Stack, Divider, Button } from "@mui/material";
import { ConverterContainer } from "./styles";
import type { ImageFormat, ConversionOptions, ConversionResult } from "./utils";
import { convertImage, downloadConvertedImage } from "./utils";
import DropZone from "@/components/DropZone";
import FormatSelector from "./components/FormatSelector";
import QualitySlider from "./components/QualitySlider";
import ImagePreview from "./components/ImagePreview";

const ImageConverter: FC = () => {
  const [converting, setConverting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [options, setOptions] = useState<ConversionOptions>({
    format: "PNG",
    quality: 0.8,
  });

  const handleFormatChange = useCallback((format: ImageFormat) => {
    setOptions((prev) => ({ ...prev, format }));
  }, []);

  const handleQualityChange = useCallback((quality: number) => {
    setOptions((prev) => ({ ...prev, quality }));
  }, []);

  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      setFile(selectedFile);
      setConverting(true);
      try {
        const conversionResult = await convertImage(selectedFile, options);
        setResult(conversionResult);
      } catch (error) {
        console.error("转换失败:", error);
      } finally {
        setConverting(false);
      }
    },
    [options]
  );

  const handleDownload = useCallback(() => {
    if (file && result) {
      downloadConvertedImage(result.converted.url, file.name, options.format);
    }
  }, [file, result, options.format]);

  return (
    <Stack spacing={4}>
      <ConverterContainer elevation={0}>
        <Stack spacing={3}>
          <FormatSelector
            value={options.format}
            onChange={handleFormatChange}
          />
          <QualitySlider
            format={options.format}
            quality={options.quality}
            onChange={handleQualityChange}
          />
          <Divider />
          <DropZone
            onFileSelect={handleFileSelect}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            multiple={false}
          />
          {result && (
            <>
              <ImagePreview result={result} />
              <Button variant="contained" onClick={handleDownload} fullWidth>
                下载转换后的图片
              </Button>
            </>
          )}
        </Stack>
      </ConverterContainer>
    </Stack>
  );
};

export default ImageConverter;
