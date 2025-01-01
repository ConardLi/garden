"use client";

import dynamic from 'next/dynamic';
import { FC } from "react";
import { StyledContainer } from "./styles";
import { useJSONFormatter } from "./hooks/useJSONFormatter";


// 动态导入组件，禁用 SSR
const JSONEditor = dynamic(() => import("./components/JSONEditor"), { ssr: false });
const JSONPreview = dynamic(() => import("./components/JSONPreview"), { ssr: false });

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
