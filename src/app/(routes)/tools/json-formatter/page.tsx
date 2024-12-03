"use client";

import { FC } from "react";
import JSONEditor from "./components/JSONEditor";
import JSONPreview from "./components/JSONPreview";
import { useJSONFormatter } from "./hooks/useJSONFormatter";
import { StyledContainer } from "./styles";

const JSONFormatter: FC = () => {
  const jsonProps = useJSONFormatter();

  return (
    <StyledContainer>
      <JSONEditor {...jsonProps} />
      <JSONPreview {...jsonProps} />
    </StyledContainer>
  );
};

export default JSONFormatter;
