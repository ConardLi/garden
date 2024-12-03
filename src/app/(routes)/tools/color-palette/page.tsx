"use client";

import { FC, useState } from "react";
import { Stack, Typography } from "@mui/material";
import ColorInput from "./components/ColorInput";
import ColorScheme from "./components/ColorScheme";
import { hexToRgb, copyToClipboard } from "./utils";
import {
  ColorPickerContainer,
  StyledColorPicker,
  ColorPreview,
  SchemeContainer,
} from "./styles";

const ColorPalette: FC = () => {
  const [currentColor, setCurrentColor] = useState<string>("#1976D2");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <ColorPickerContainer elevation={0}>
        <Stack spacing={3}>
          <StyledColorPicker
            type="color"
            value={currentColor}
            onChange={handleColorChange}
          />

          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="medium">
              当前颜色
            </Typography>
            <ColorPreview color={currentColor} />
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="medium">
              颜色值
            </Typography>
            <ColorInput
              label="HEX"
              value={currentColor}
              onCopy={copyToClipboard}
            />
            <ColorInput
              label="RGB"
              value={hexToRgb(currentColor)}
              onCopy={copyToClipboard}
            />
          </Stack>
        </Stack>
      </ColorPickerContainer>

      <SchemeContainer elevation={0}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight="bold">
            色彩方案
          </Typography>
          <ColorScheme baseColor={currentColor} />
        </Stack>
      </SchemeContainer>
    </Stack>
  );
};

export default ColorPalette;
