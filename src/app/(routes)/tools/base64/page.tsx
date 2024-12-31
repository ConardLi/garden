"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { CodecContainer } from "./styles";
import CodecEditor from "./components/CodecEditor";
import { encode, decode } from "./utils";
import type { CodecMode } from "./types";

const Base64Codec: FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<CodecMode>("encode");

  const handleProcess = useCallback(() => {
    try {
      const result = mode === "encode" 
        ? encode(input)
        : decode(input);
      setOutput(result);
    } catch (error) {
      console.error("处理失败:", error);
    }
  }, [input, mode]);

  const handleModeChange = useCallback((newMode: CodecMode) => {
    setMode(newMode);
    setOutput("");
  }, []);

  const handleSwap = useCallback(() => {
    setInput(output);
    setOutput("");
  }, [output]);

  return (
    <Stack spacing={4}>
      <CodecContainer elevation={0}>
        <Stack spacing={3}>
          <CodecEditor
            input={input}
            output={output}
            mode={mode}
            onInputChange={setInput}
            onModeChange={handleModeChange}
            onProcess={handleProcess}
            onSwap={handleSwap}
          />
        </Stack>
      </CodecContainer>
    </Stack>
  );
};

export default Base64Codec; 