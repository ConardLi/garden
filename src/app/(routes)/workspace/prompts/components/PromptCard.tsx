import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Tooltip } from '@mui/material';
import { Prompt } from '../types';

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  width: "100%",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-2px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
}));

const Title = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.1rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "rgba(255, 255, 255, 0.95)",
  lineHeight: 1.2,
  marginBottom: "4px",
});

const Description = styled(Typography)({
  color: "rgba(255, 255, 255, 0.8)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  lineHeight: 1.4,
  fontSize: "0.95rem",
  flex: 1,
  minHeight: 0,
});

const TagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  gap: theme.spacing(0.8),
  marginTop: "auto",
  paddingTop: theme.spacing(1.5),
  overflow: "hidden",
}));

const Tag = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  borderRadius: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1.2),
  fontSize: "0.8rem",
  color: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
}));

const MoreTags = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1.2),
  fontSize: "0.8rem",
  color: "rgba(255, 255, 255, 0.7)",
  whiteSpace: "nowrap",
}));

interface PromptCardProps {
  prompt: Prompt;
  style?: React.CSSProperties;
  onClick: (prompt: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ prompt, style, onClick }) => {
  const visibleTags = prompt.tags.slice(0, 2);
  const remainingTags = prompt.tags.length - 2;

  return (
    <Box style={style}>
      <Tooltip
        title={
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {prompt.description}
            </Typography>
            {prompt.tags.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {prompt.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        }
        placement="top"
        arrow
      >
        <Card onClick={() => onClick(prompt)}>
          <Title variant="h6">{prompt.title}</Title>
          <Description>{prompt.description}</Description>
          <TagsContainer>
            {visibleTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {remainingTags > 0 && <MoreTags>+{remainingTags}</MoreTags>}
          </TagsContainer>
        </Card>
      </Tooltip>
    </Box>
  );
});

PromptCard.displayName = 'PromptCard';

export default PromptCard;
