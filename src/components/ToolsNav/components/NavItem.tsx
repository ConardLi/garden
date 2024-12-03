import { FC } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';
import { primaryNavItemStyles, secondaryNavItemStyles } from '../styles';

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  sx?: SxProps<Theme>;
}

const NavItem: FC<NavItemProps> = ({ 
  icon, 
  label, 
  selected, 
  onClick,
  variant = 'primary',
  sx = {}
}) => {
  const baseStyles = variant === 'primary' ? primaryNavItemStyles : secondaryNavItemStyles;

  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
      sx={[baseStyles, ...(Array.isArray(sx) ? sx : [sx])] as SxProps<Theme>}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText 
        primary={label}
        primaryTypographyProps={{
          variant: 'body2',
          fontWeight: selected ? 'medium' : 'regular',
          ...(variant === 'primary' && {
            color: 'text.secondary',
            fontWeight: 'medium',
            variant: 'subtitle2'
          })
        }}
        sx={!icon ? { pl: 1 } : undefined}
      />
    </ListItemButton>
  );
};

export default NavItem; 