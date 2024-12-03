"use client";

import { FC } from "react";
import QRCodeEditor from "./components/QRCodeEditor";
import QRCodePreview from "./components/QRCodePreview";
import { useQRCode } from "./hooks/useQRCode";
import { StyledContainer } from "./styles";

const QRGenerator: FC = () => {
  const qrCodeProps = useQRCode();

  return (
    <StyledContainer>
      <QRCodeEditor {...qrCodeProps} />
      <QRCodePreview {...qrCodeProps} />
    </StyledContainer>
  );
};

export default QRGenerator;
