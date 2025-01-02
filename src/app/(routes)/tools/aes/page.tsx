"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { AESContainer } from "./styles";
import AESForm from "./components/AESForm";
import { encrypt, decrypt } from "./utils";
import type { AESOptions, AESMode } from "./types";

const AESTool: FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AESMode>("encrypt");
  const [options, setOptions] = useState<AESOptions>({
    mode: "CBC",
    padding: "PKCS7",
    keySize: 256,
    key: "",
    iv: "",
    encoding: "base64",
  });

  const handleProcess = useCallback(() => {
    try {
      setError(null);
      const result = mode === "encrypt" 
        ? encrypt(input, options)
        : decrypt(input, options);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "处理失败");
      setOutput("");
    }
  }, [input, mode, options]);

  const handleModeChange = useCallback((newMode: AESMode) => {
    setMode(newMode);
    setOutput("");
    setError(null);
  }, []);

  return (
    <Stack spacing={4}>
      <AESContainer elevation={0}>
        <Stack spacing={3}>
          <AESForm
            input={input}
            output={output}
            error={error}
            mode={mode}
            options={options}
            onInputChange={setInput}
            onModeChange={handleModeChange}
            onOptionsChange={setOptions}
            onProcess={handleProcess}
          />
        </Stack>
      </AESContainer>
    </Stack>
  );
};

export default AESTool; 