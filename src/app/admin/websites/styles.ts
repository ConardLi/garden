import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/material';

// 改用 Box 而不是 Container，避免默认的边距
export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100% !important',
}));

export const GlassCard = styled('div')(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const TableContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTable-root': {
    minWidth: 750,
  },
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
}));
