"use client";

import { Box, Grid, Link, Typography, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const LinkGroup = styled(Box)(({ theme }) => ({
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
  "& .MuiLink-root": {
    color: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.7)" 
      : "rgba(0, 0, 0, 0.7)",
    textDecoration: "none",
    fontSize: "0.875rem",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Footer = () => {
  const footerLinks = {
    "关于": [
      { text: "关于我们", href: "/about" },
      { text: "隐私政策", href: "/privacy" },
      { text: "用户协议", href: "/terms" },
      { text: "使用条款", href: "/usage" },
      { text: "更新日志", href: "/changelog" },
    ],
    "导航": [
      { text: "AI 工具导航", href: "/ai-tools" },
      { text: "AI Prompts 导航", href: "/prompts" },
      { text: "花园工具导航", href: "/garden-tools" },
      { text: "常用网站导航", href: "/websites" },
    ],
    "关注": [
      { text: "微信小程序", href: "#", isImage: true, qrImage: "/imgs/mp-qr.jpg" },
      { text: "微信公众号", href: "#", isImage: true, qrImage: "/imgs/weichat-qr.jpeg" },
      { text: "浏览器插件", href: "https://chrome.google.com/webstore" },
    ],
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {Object.entries(footerLinks).map(([category, links]) => (
          <Grid item xs={12} sm={4} key={category}>
            <LinkGroup>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(0, 0, 0, 0.9)",
                }}
              >
                {category}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </LinkGroup>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ 
        borderColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)" 
      }} />

      <Box sx={{ pt: 3, textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(0, 0, 0, 0.6)",
          }}
        >
          {new Date().getFullYear()} Web Tools. All rights reserved.
          <Link
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              ml: 1,
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            浙ICP备2023XXXXXX号-1
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
