import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, IconButton, Chip, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as MuiIcons from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

const StyledCardContent = styled(CardContent)({
  padding: '16px !important',
  '&:last-child': {
    paddingBottom: '16px !important',
  },
});

const CardHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  '& .MuiTypography-root': {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

const TagContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  description,
  icon,
  tags,
  isFavorite,
  onFavoriteToggle,
  onClick,
}) => {
  const Icon = (MuiIcons as any)[icon];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <StyledCard onClick={onClick}>
      <StyledCardContent>
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {Icon && <Icon />}
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
          </Box>
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              color: isFavorite ? '#ffa39e' : 'rgba(255, 255, 255, 0.5)',
              padding: '4px',
              marginRight: '-8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: isFavorite ? '#ffccc7' : 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiSvgIcon-root': {
                color: 'inherit',
              },
            }}
            size="small"
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#ffa39e' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </CardHeader>

        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
        <TagContainer>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          ))}
        </TagContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ItemCard;
