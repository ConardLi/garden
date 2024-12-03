import { FC } from 'react';
import { Box, TextField, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    }
  }
}));

interface ColorInputProps {
  label: string;
  value: string;
  onCopy: (text: string) => void;
}

const ColorInput: FC<ColorInputProps> = ({ label, value, onCopy }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <StyledTextField
        label={label}
        value={value}
        fullWidth
        size="small"
        InputProps={{ readOnly: true }}
      />
      <Tooltip title="复制" arrow>
        <IconButton 
          onClick={() => onCopy(value)}
          sx={{ 
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': { 
              bgcolor: 'background.paper',
              transform: 'scale(1.05)'
            }
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ColorInput; 