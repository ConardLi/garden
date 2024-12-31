"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { GUIDContainer } from "./styles";
import GUIDGenerator from "./components/GUIDGenerator";
import GUIDHistory from "./components/GUIDHistory";
import { generateGUID } from "./utils";
import type { GUIDOptions } from "./types";

const GUIDTool: FC = () => {
  const [options, setOptions] = useState<GUIDOptions>({
    format: "D",
    uppercase: false,
    count: 1,
  });
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const guids = Array.from({ length: options.count }, () =>
      generateGUID(options)
    );
    setHistory((prev) => [...guids, ...prev].slice(0, 50));
  }, [options]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <Stack spacing={4}>
      <GUIDContainer elevation={0}>
        <Stack spacing={3}>
          <GUIDGenerator
            options={options}
            onOptionsChange={setOptions}
            onGenerate={handleGenerate}
          />
          <GUIDHistory
            history={history}
            onClear={handleClearHistory}
            format={options.format}
          />
        </Stack>
      </GUIDContainer>
    </Stack>
  );
};

export default GUIDTool; 