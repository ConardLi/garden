"use client";

import { FC } from "react";
import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";

interface LogoProps {
  title?: string;
}

const Logo: FC<LogoProps> = ({ title }) => {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            width: 36,
            height: 36,
            objectFit: "contain",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1) rotate(5deg)",
            },
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ 
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 400 80"
            sx={{
              width: 260,
              height: 52,
              display: "flex",
              alignItems: "center",
              mr: -0.5,
            }}
          >
            <text
              x="0"
              y="54"
              style={{
                fontSize: "52px",
                fontWeight: 800,
                animation: "stroke 3s infinite alternate",
                letterSpacing: "2px",
              }}
            >
              花园工具箱
            </text>
          </Box>
          <style jsx>{`
            @keyframes stroke {
              0% {
                fill: rgba(0, 0, 0, 0);
                stroke: rgba(0, 0, 0, 0.85);
                stroke-width: 1;
                stroke-dasharray: 0 50%;
                stroke-dashoffset: 20%;
              }
              70% {
                fill: rgba(0, 0, 0, 0);
                stroke: rgba(0, 0, 0, 0.85);
                stroke-width: 2;
              }
              100% {
                fill: rgba(0, 0, 0, 0.85);
                stroke: rgba(0, 0, 0, 0);
                stroke-width: 0;
                stroke-dasharray: 50% 0;
                stroke-dashoffset: -20%;
              }
            }
          `}</style>

          <Box
            component="span"
            sx={{
              width: 1,
              height: 22,
              background: "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.2), transparent)",
              transform: "rotate(15deg)",
              mx: 1,
            }}
          />

          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.75)",
              position: "relative",
              ml: 0.5,
              transition: "color 0.3s ease",
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "1px",
                bottom: -1,
                left: 0,
                background: "rgba(0, 0, 0, 0.5)",
                transition: "width 0.3s ease",
              },
              "&:hover": {
                color: "rgba(0, 0, 0, 0.95)",
                "&::after": {
                  width: "100%",
                },
              },
            }}
          >
            {title || "工具箱"}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default Logo; 