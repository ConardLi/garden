import React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Menu,
  MenuItem,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius * 1.5,

  "& .MuiCardActionArea-root": {
    padding: theme.spacing(1.2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },

  "& .icon": {
    color: "white",
    fontSize: "1.8rem",
    height: "1.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "& .item-name": {
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
    maxWidth: "80%",
  },

  "&:hover": {
    transform: "translateY(-4px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    "& .item-name": {
      opacity: 1,
    },
  },
}));

const StyledTooltip = styled((props: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: props.className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    fontSize: "0.75rem",
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
  },
}));

interface ToolCardProps {
  name: string;
  icon: string;
  onClick: () => void;
  onUnfavorite?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  name,
  icon,
  onClick,
  onUnfavorite,
}) => {
  const Icon = (MuiIcons as any)[icon];
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleUnfavorite = () => {
    if (onUnfavorite) {
      onUnfavorite();
    }
    handleClose();
  };

  return (
    <>
      <StyledTooltip title={name} placement="top" arrow>
        <StyledCard onContextMenu={handleContextMenu}>
          <CardActionArea onClick={onClick}>
            <Box className="icon">
              {Icon && <Icon sx={{ fontSize: "inherit" }} />}
            </Box>
            <Typography className="item-name">{name}</Typography>
          </CardActionArea>
        </StyledCard>
      </StyledTooltip>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleUnfavorite}>取消收藏</MenuItem>
      </Menu>
    </>
  );
};

export default ToolCard;
