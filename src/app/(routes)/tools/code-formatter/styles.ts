import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const FormatterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));