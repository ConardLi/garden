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
          spacing={3}
          sx={{ 
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 400 80"
            sx={{
              width: 280,
              height: 56,
              display: "flex",
              alignItems: "center",
            }}
          >
            <text
              x="0"
              y="56"
              style={{
                fontSize: "40px",
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

          <Typography
            sx={{
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.65)",
              position: "relative",
              pl: 2.5,
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              marginLeft: "-100px !important",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 2,
                height: "45%",
                background: "linear-gradient(180deg, #1976d2, rgba(25, 118, 210, 0.3))",
                borderRadius: 4,
                transition: "height 0.3s ease",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: -2,
                left: "20%",
                background: "linear-gradient(90deg, transparent, #1976d2, transparent)",
                transition: "width 0.3s ease",
                opacity: 0,
              },
              "&:hover": {
                color: "#1976d2",
                transform: "translateY(-1px)",
                "&::before": {
                  height: "80%",
                },
                "&::after": {
                  width: "60%",
                  opacity: 1,
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