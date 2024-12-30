"use client";

import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { FormatterContainer } from "./styles";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import type { Language } from "./types";

const CodeFormatter: FC = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("javascript");

  const handleFormat = () => {
    // 清除错误
    setError(null);
  };

  return (
    <Stack spacing={4}>
      <FormatterContainer elevation={0}>
        <Stack spacing={3}>
          <LanguageSelector
            language={language}
            onLanguageChange={setLanguage}
          />
          <CodeEditor
            input={input}
            output=""
            error={error}
            language={language}
            onInputChange={setInput}
            onFormat={handleFormat}
          />
        </Stack>
      </FormatterContainer>
    </Stack>
  );
};

export default CodeFormatter; 