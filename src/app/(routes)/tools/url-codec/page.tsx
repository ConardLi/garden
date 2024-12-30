"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { CodecContainer } from "./styles";
import CodecEditor from "./components/CodecEditor";
import { encode, decode } from "./utils";
import type { EncodeMode } from "./utils";

const URLCodec: FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeMode, setEncodeMode] = useState<EncodeMode>("encodeURIComponent");

  const handleProcess = useCallback(() => {
    try {
      const result = mode === "encode" 
        ? encode(input, encodeMode)
        : decode(input, encodeMode);
      setOutput(result);
    } catch (error) {
      console.error("处理失败:", error);
    }
  }, [input, mode, encodeMode]);

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode);
    setOutput("");
  }, []);

  const handleEncodeModeChange = useCallback((newMode: EncodeMode) => {
    setEncodeMode(newMode);
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
            encodeMode={encodeMode}
            onInputChange={setInput}
            onModeChange={handleModeChange}
            onEncodeModeChange={handleEncodeModeChange}
            onProcess={handleProcess}
            onSwap={handleSwap}
          />
        </Stack>
      </CodecContainer>
    </Stack>
  );
};

export default URLCodec; 