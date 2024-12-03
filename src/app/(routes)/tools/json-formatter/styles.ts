import { styled, Box, Card, CardContent } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  height: 'calc(100vh - 100px)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const StyledCardContent = styled(CardContent)({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}); 