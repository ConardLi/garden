import { styled, Box } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const ColorInput = styled('input')({
  width: 40,
  height: 40,
  padding: 0,
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  '&::-webkit-color-swatch-wrapper': {
    padding: 0,
  },
  '&::-webkit-color-swatch': {
    border: 'none',
    borderRadius: 8,
  },
}); 