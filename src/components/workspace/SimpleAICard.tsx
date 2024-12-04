import React from "react";
import { styled } from "@mui/material/styles";
import { Card, CardActionArea, Typography, Box, Tooltip } from "@mui/material";
import { AIWebsite } from "../../types/ai";

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
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "6px",
  },
});

const LargeIconContainer = styled(Box)({
  width: "1.8rem",
  height: "1.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "6px",
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

interface SimpleAICardProps {
  website: AIWebsite;
  onClick: () => void;
}

const IconImage = React.memo(({ website }: { website: AIWebsite }) => {
  if (website.iconType === "svg") {
    console.log(website.title, website.iconValue);
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
          __html: website.iconValue || "",
        }}
      />
    );
  }

  const iconPath = website.iconType ? website.icon : `/ai/${website.icon}`;
  return <img src={iconPath} alt={website.title} />;
});

const SimpleAICard: React.FC<SimpleAICardProps> = React.memo(
  ({ website, onClick }) => {
    return (
      <Tooltip title={website.description} arrow placement="top">
        <StyledCard onClick={onClick}>
          <StyledCardActionArea>
            {website.iconType ? (
              <LargeIconContainer>
                <IconImage website={website} />
              </LargeIconContainer>
            ) : (
              <IconContainer>
                <IconImage website={website} />
              </IconContainer>
            )}
            <WebsiteName>{website.title}</WebsiteName>
          </StyledCardActionArea>
        </StyledCard>
      </Tooltip>
    );
  }
);

SimpleAICard.displayName = "SimpleAICard";

export default SimpleAICard;
