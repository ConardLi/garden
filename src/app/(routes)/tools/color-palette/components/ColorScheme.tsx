import { FC } from 'react';
import { Grid, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorBox = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: '100%',
  position: 'relative',
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  }
}));

interface ColorSchemeProps {
  baseColor: string;
  onClick?: (color: string) => void;
}

const ColorScheme: FC<ColorSchemeProps> = ({ baseColor, onClick }) => {
  const schemes = [
    { name: '原色', rotate: 0 },
    { name: '类比色 1', rotate: 30 },
    { name: '类比色 2', rotate: 60 },
    { name: '补色', rotate: 180 },
    { name: '三角色', rotate: 120 }
  ];

  return (
    <Grid container spacing={2}>
      {schemes.map(({ name, rotate }, index) => (
        <Grid item xs={4} sm={2.4} key={index}>
          <Tooltip title={name} arrow>
            <ColorBox
              sx={{
                bgcolor: baseColor,
                filter: `hue-rotate(${rotate}deg)`,
              }}
              onClick={() => onClick?.(baseColor)}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorScheme; 