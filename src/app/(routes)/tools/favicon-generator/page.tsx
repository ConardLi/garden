"use client";

import { FC, useState, useCallback } from "react";
import { Stack, Divider } from "@mui/material";
import { GeneratorContainer } from "./styles";
import type { FaviconOptions, GeneratedFavicon } from "./utils";
import {
  generateFavicons,
  downloadFavicon,
  downloadAllFavicons,
} from "./utils";
import DropZone from "@/components/DropZone";
import GeneratorOptions from "./components/GeneratorOptions";
import IconPreview from "./components/IconPreview";

const FaviconGenerator: FC = () => {
  const [generating, setGenerating] = useState(false);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [options, setOptions] = useState<FaviconOptions>({
    size: 256,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 0,
  });

  const handleFileSelect = useCallback(
    async (file: File) => {
      setGenerating(true);
      try {
        const generatedFavicons = await generateFavicons(file, options);
        setFavicons(generatedFavicons);
      } catch (error) {
        console.error("生成失败:", error);
      } finally {
        setGenerating(false);
      }
    },
    [options]
  );

  const handleDownload = useCallback((favicon: GeneratedFavicon) => {
    downloadFavicon(favicon);
  }, []);

  const handleDownloadAll = useCallback(() => {
    downloadAllFavicons(favicons);
  }, [favicons]);

  return (
    <Stack spacing={4}>
      <GeneratorContainer elevation={0}>
        <Stack spacing={3}>
          <GeneratorOptions options={options} onChange={setOptions} />
          <Divider />
          <DropZone
            onFileSelect={handleFileSelect}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            multiple={false}
          />
          {favicons.length > 0 && (
            <IconPreview
              favicons={favicons}
              onDownload={handleDownload}
              onDownloadAll={handleDownloadAll}
            />
          )}
        </Stack>
      </GeneratorContainer>
    </Stack>
  );
};

export default FaviconGenerator;
