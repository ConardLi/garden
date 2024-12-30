"use client";

import { FC, useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  InputBase,
  Popover,
  Box,
  Avatar,
  Typography,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import { styled } from "@mui/material/styles";
import { TOOLS } from "@/constants/tools";
import SearchResults from "./components/SearchResults";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "300px",
  maxWidth: 400,
  marginRight: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const TopNav: FC<{ title?: string }> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wechatAnchorEl, setWechatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [mpAnchorEl, setMpAnchorEl] = useState<HTMLElement | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTools = TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 56,
      }}
    >
      <Toolbar sx={{ gap: 2, height: 56, minHeight: "56px !important" }}>
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
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ whiteSpace: "nowrap" }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #1976D2 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  fontSize: "1.25rem",
                }}
              >
                code秘密花园
              </Typography>

              <Box
                component="span"
                sx={{
                  width: 1,
                  height: 16,
                  bgcolor: "divider",
                }}
              />

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "text.secondary",
                  letterSpacing: "0.01em",
                }}
              >
                {title || "工具箱"}
              </Typography>
            </Stack>
          </Stack>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1} alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="搜索工具..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <SearchResults
                tools={filteredTools}
                searchTerm={searchTerm}
                onClose={() => setSearchTerm("")}
              />
            )}
          </Search>

          <Box
            onMouseEnter={(e) => setWechatAnchorEl(e.currentTarget)}
            onMouseLeave={() => setWechatAnchorEl(null)}
          >
            <IconButton>
              <Box
                component="img"
                src="/imgs/weichat.svg"
                alt="WeChat"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
            <Popover
              open={Boolean(wechatAnchorEl)}
              anchorEl={wechatAnchorEl}
              onClose={() => setWechatAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  onMouseEnter: () => setWechatAnchorEl(wechatAnchorEl),
                  onMouseLeave: () => setWechatAnchorEl(null),
                  sx: {
                    mt: 1,
                    boxShadow: 4,
                  },
                },
              }}
              sx={{
                pointerEvents: "none",
                "& .MuiPopover-paper": {
                  pointerEvents: "auto",
                },
              }}
            >
              <Box
                component="img"
                src="/imgs/weichat-qr.jpeg"
                alt="WeChat QR Code"
                sx={{ width: 200, height: 200, p: 2 }}
              />
            </Popover>
          </Box>

          <Box
            onMouseEnter={(e) => setMpAnchorEl(e.currentTarget)}
            onMouseLeave={() => setMpAnchorEl(null)}
          >
            <IconButton>
              <Box
                component="img"
                src="/imgs/mp.svg"
                alt="MP"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
            <Popover
              open={Boolean(mpAnchorEl)}
              anchorEl={mpAnchorEl}
              onClose={() => setMpAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  onMouseEnter: () => setMpAnchorEl(mpAnchorEl),
                  onMouseLeave: () => setMpAnchorEl(null),
                  sx: {
                    mt: 1,
                    boxShadow: 4,
                  },
                },
              }}
              sx={{
                pointerEvents: "none",
                "& .MuiPopover-paper": {
                  pointerEvents: "auto",
                },
              }}
            >
              <Box
                component="img"
                src="/imgs/mp-qr.jpg"
                alt="MP QR Code"
                sx={{ width: 200, height: 200, p: 2 }}
              />
            </Popover>
          </Box>

          <IconButton
            href="https://github.com/ConardLi/web-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>

          <IconButton>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: "0.875rem",
                bgcolor: "primary.main",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
