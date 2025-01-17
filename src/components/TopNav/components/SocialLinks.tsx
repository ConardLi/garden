"use client";

import { FC, useState } from "react";
import { IconButton, Box, Popover, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { UserAvatar } from "@/components/workspace/components/UserAvatar";

const SocialLinks: FC = () => {
  const [wechatAnchorEl, setWechatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [mpAnchorEl, setMpAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
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
              sx: { mt: 1, boxShadow: 4 },
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
              sx: { mt: 1, boxShadow: 4 },
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
        <GitHubIcon sx={{ fontSize: 24 }} />
      </IconButton>

      <UserAvatar />
    </>
  );
};

export default SocialLinks;
