"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { MD5Container } from "./styles";
import MD5Input from "./components/MD5Input";
import MD5Options from "./components/MD5Options";
import MD5Result from "./components/MD5Result";
import { calculateMD5, saveToHistory } from "./utils";
import type { MD5Options as MD5OptionsType } from "./types";

const MD5Tool: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [options, setOptions] = useState<MD5OptionsType>({
    uppercase: false,
    salt: "",
    saltPosition: "append",
    iterations: 1,
  });

  const handleCalculate = useCallback(() => {
    if (!input) return;
    const hash = calculateMD5(input, options);
    setResult(hash);
    saveToHistory(input, hash, options);
  }, [input, options]);

  return (
    <Stack spacing={4}>
      <MD5Container elevation={0}>
        <Stack spacing={3}>
          <MD5Input
            input={input}
            onInputChange={setInput}
            onCalculate={handleCalculate}
          />
          <MD5Options
            options={options}
            onOptionsChange={setOptions}
          />
          <MD5Result
            result={result}
            input={input}
            options={options}
          />
        </Stack>
      </MD5Container>
    </Stack>
  );
};

export default MD5Tool;
