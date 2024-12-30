"use client";

import { FC, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { RegexContainer } from "./styles";
import RegexInput from "./components/RegexInput";
import RegexOptions from "./components/RegexOptions";
import RegexResult from "./components/RegexResult";

const RegexTester: FC = () => {
  const [pattern, setPattern] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });

  const handleTest = useCallback(() => {
    // 正则测试逻辑在 RegexResult 组件中处理
  }, []);

  return (
    <Stack spacing={4}>
      <RegexContainer elevation={0}>
        <Stack spacing={3}>
          <RegexInput
            pattern={pattern}
            text={text}
            onPatternChange={setPattern}
            onTextChange={setText}
          />
          <RegexOptions flags={flags} onFlagsChange={setFlags} />
          <RegexResult pattern={pattern} text={text} flags={flags} />
        </Stack>
      </RegexContainer>
    </Stack>
  );
};

export default RegexTester; 