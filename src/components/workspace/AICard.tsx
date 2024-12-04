import React, { useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AIWebsite } from "../../types/ai";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  "&:hover": {
    transform: "translateY(-4px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: "10px 12px 4px !important",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  position: "relative",
  "&:last-child": {
    paddingBottom: "4px !important",
  },
}));

const IconContainer = styled("div")({
  width: 48,
  height: 48,
  flexShrink: 0,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "24px",
  },
});

const ContentContainer = styled("div")({
  flex: 1,
  minWidth: 0, // 确保文本可以正确截断
});

const StyledTitle = styled(Typography)({
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const StyledDescription = styled(Typography)({
  color: "rgba(255, 255, 255, 0.7)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  fontSize: "0.875rem",
  lineHeight: 1.3,
});

const FavoriteButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  padding: 4,
});

const TooltipContent = styled("div")({
  maxWidth: 300,
  "& .title": {
    fontWeight: 500,
    marginBottom: 8,
    color: "rgba(255, 255, 255, 0.95)",
  },
  "& .description": {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
});

const IconImage = React.memo(
  ({ src, website }: { src: string; website: AIWebsite }) => {
    if (website.iconType === "svg") {
      return (
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& svg": {
              width: "100%",
              height: "100%",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: website.iconValue,
          }}
        />
      );
    }

    return <img src={src} alt="" loading="lazy" />;
  }
);

interface AICardProps {
  website: AIWebsite;
  favoriteWebsites: string[];
  onFavoriteToggle: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
}

const AICard: React.FC<AICardProps> = React.memo(
  ({ website, favoriteWebsites, onFavoriteToggle, onClick, style }) => {
    const isFavorite = favoriteWebsites.includes(website.title);

    const handleFavoriteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavoriteToggle();
      },
      [onFavoriteToggle]
    );

    const tooltipContent = (
      <TooltipContent>
        <div className="title">{website.title}</div>
        <div className="description">{website.description}</div>
      </TooltipContent>
    );

    const cardContent = (
      <StyledCardContent>
        <IconContainer>
          <IconImage src={`${website.icon}`} website={website} />
        </IconContainer>
        <ContentContainer>
          <StyledTitle variant="subtitle1">{website.title}</StyledTitle>
          <StyledDescription>{website.description}</StyledDescription>
        </ContentContainer>
        <FavoriteButton
          onClick={handleFavoriteClick}
          sx={{
            color: isFavorite ? "#ffa39e" : "rgba(255, 255, 255, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: isFavorite ? "#ffccc7" : "rgba(255, 255, 255, 0.7)",
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </FavoriteButton>
      </StyledCardContent>
    );

    const handleCardClick = useCallback(() => {
      onClick();
    }, [onClick]);

    return (
      <Tooltip
        title={tooltipContent}
        placement="top"
        arrow
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        }}
      >
        <Box style={style}>
          <StyledCard onClick={handleCardClick}>{cardContent}</StyledCard>
        </Box>
      </Tooltip>
    );
  }
);

export default AICard;
