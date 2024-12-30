"use client";

import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { DiffContainer } from "./styles";
import DiffEditor from "./components/DiffEditor";
import LanguageSelector from "./components/LanguageSelector";
import type { Language } from "../code-formatter/types";

const CodeDiff: FC = () => {
  const [original, setOriginal] = useState<string>("");
  const [modified, setModified] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");

  return (
    <Stack spacing={4}>
      <DiffContainer elevation={0}>
        <Stack spacing={3}>
          <LanguageSelector
            language={language}
            onLanguageChange={setLanguage}
          />
          <DiffEditor
            original={original}
            modified={modified}
            language={language}
            onOriginalChange={setOriginal}
            onModifiedChange={setModified}
          />
        </Stack>
      </DiffContainer>
    </Stack>
  );
};

export default CodeDiff; 