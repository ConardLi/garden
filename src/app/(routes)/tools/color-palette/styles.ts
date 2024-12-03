import { styled, Paper, Box } from '@mui/material';

interface ColorPreviewProps {
  color: string;
}

export const ColorPickerContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

export const StyledColorPicker = styled('input')(({ theme }) => ({
  WebkitAppearance: 'none',
  width: '100%',
  height: '150px',
  padding: '0',
  border: 'none',
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  '&::-webkit-color-swatch-wrapper': {
    padding: 0,
  },
  '&::-webkit-color-swatch': {
    border: 'none',
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
}));

export const ColorPreview = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<ColorPreviewProps>(({ color, theme }) => ({
  width: '100%',
  height: '80px',
  borderRadius: '12px',
  backgroundColor: color,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  }
}));

export const SchemeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
})); 