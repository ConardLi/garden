'use client';

import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { ListItem, ListItemIcon, Tooltip } from '@mui/material';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: '40px',
  height: '48px',
  borderRadius: theme.shape.borderRadius,
  padding: 0,
  color: 'white',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.1)',
  },
  
  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  '& .MuiListItemIcon-root': {
    color: 'white',
    minWidth: 'unset',
    margin: 0,
    justifyContent: 'center',
  },

  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },

  '& .nav-label': {
    fontSize: '0.6rem',
    marginTop: '2px',
  },
}));

interface NavItemProps {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ id, label, icon, active, onClick }: NavItemProps) {
  return (
    <Tooltip title={label} placement="right" arrow>
      <StyledListItem
        className={active ? 'active' : ''}
        onClick={onClick}
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <div className="nav-label">{label}</div>
      </StyledListItem>
    </Tooltip>
  );
} 