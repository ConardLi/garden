import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Popper,
  Paper,
  Fade,
  ClickAwayListener,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import LanguageIcon from "@mui/icons-material/Language";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useRouter } from "next/navigation";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius * 1.5,
  "&:hover": {
    transform: "translateY(-4px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(1.2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const IconContainer = styled(Box)({
  width: "1.8rem",
  height: "1.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    width: "100%",
    height: "100%",
    color: "rgba(255, 255, 255, 0.8)",
  },
});

const WebsiteName = styled(Typography)({
  color: "white",
  fontSize: "0.75rem",
  fontWeight: 400,
  textAlign: "center",
  lineHeight: 1.2,
  opacity: 0.9,
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const PopperContent = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(45, 45, 45, 0.95)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginTop: "8px",
}));

const MenuItem = styled(Box)({
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.2rem",
    opacity: 0.8,
  },
  "& .menu-text": {
    fontSize: "0.9rem",
  },
});

const AddFavoriteCard: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const menuItems = [
    {
      text: "添加站内工具收藏",
      path: "/workspace/tools",
      icon: <BuildIcon />,
    },
    {
      text: "添加常用网站收藏",
      path: "/workspace/websites",
      icon: <LanguageIcon />,
    },
    {
      text: "添加 AI 工具收藏",
      path: "/workspace/ai",
      icon: <SmartToyIcon />,
    },
  ];

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <StyledCard>
        <StyledCardActionArea>
          <IconContainer>
            <AddIcon />
          </IconContainer>
          <WebsiteName>添加收藏</WebsiteName>
        </StyledCardActionArea>
      </StyledCard>

      <Popper
        open={open}
        anchorEl={cardRef.current}
        placement="top"
        transition
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <PopperContent>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  {item.icon}
                  <span className="menu-text">{item.text}</span>
                </MenuItem>
              ))}
            </PopperContent>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default AddFavoriteCard;
