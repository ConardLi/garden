import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const GeneratorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const PreviewContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
})); 