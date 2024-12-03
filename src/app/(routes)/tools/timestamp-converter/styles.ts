import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const Container = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCard = styled(Card)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;
  
  .MuiTextField-root {
    margin-bottom: 8px;
  }

  .MuiButton-root {
    align-self: flex-start;
  }
`;

export const ResultContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: ${({ theme }) => theme.palette.action.hover};
    border-radius: 4px;
    
    &:hover {
      background-color: ${({ theme }) => theme.palette.action.selected};
    }
    
    .copy-button {
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    &:hover .copy-button {
      opacity: 1;
    }
  }
`;
