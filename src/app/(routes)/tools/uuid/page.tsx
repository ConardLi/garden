"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { UUIDContainer } from "./styles";
import UUIDGenerator from "./components/UUIDGenerator";
import UUIDHistory from "./components/UUIDHistory";
import { generateUUID } from "./utils";
import type { UUIDOptions, UUIDVersion } from "./types";

const UUIDTool: FC = () => {
  const [options, setOptions] = useState<UUIDOptions>({
    version: "v4",
    uppercase: false,
    removeDashes: false,
    count: 1,
  });
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const uuids = Array.from({ length: options.count }, () =>
      generateUUID(options)
    );
    setHistory((prev) => [...uuids, ...prev].slice(0, 50)); // 保留最近50条记录
  }, [options]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <Stack spacing={4}>
      <UUIDContainer elevation={0}>
        <Stack spacing={3}>
          <UUIDGenerator
            options={options}
            onOptionsChange={setOptions}
            onGenerate={handleGenerate}
          />
          <UUIDHistory
            history={history}
            onClear={handleClearHistory}
            uppercase={options.uppercase}
          />
        </Stack>
      </UUIDContainer>
    </Stack>
  );
};

export default UUIDTool; 