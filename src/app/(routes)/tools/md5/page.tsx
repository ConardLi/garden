"use client";
import { FC } from "react";
import MD5Editor from "./components/MD5Editor";
import { useMD5 } from "./hooks/useMD5";
import { StyledContainer } from "./styles";

const MD5Generator: FC = () => {
  const md5Props = useMD5();

  return (
    <StyledContainer>
      <MD5Editor {...md5Props} />
    </StyledContainer>
  );
};

export default MD5Generator;
