import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemIcon, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const NavContainer = styled(Box)(({ theme }) => ({
  width: '50px',
  minHeight: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease',
  position: 'sticky',
  top: 0,
}));

const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: 0,

  '& .MuiListItem-root': {
    width: '40px',
    height: '40px',
    borderRadius: theme.shape.borderRadius,
    padding: 0,
    color: 'white',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      transform: 'scale(1.1)',
    },
    
    '&.active': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
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
}));

interface WorkspaceNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WorkspaceNav: React.FC<WorkspaceNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <NavContainer>
      <NavList>
        <Tooltip title="主页" placement="right" arrow>
          <ListItem
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => onTabChange('home')}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="工具" placement="right" arrow>
          <ListItem
            className={activeTab === 'tools' ? 'active' : ''}
            onClick={() => onTabChange('tools')}
          >
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="网站" placement="right" arrow>
          <ListItem
            className={activeTab === 'websites' ? 'active' : ''}
            onClick={() => onTabChange('websites')}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="AI" placement="right" arrow>
          <ListItem
            className={activeTab === 'ai' ? 'active' : ''}
            onClick={() => onTabChange('ai')}
          >
            <ListItemIcon>
              <SmartToyIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      </NavList>
    </NavContainer>
  );
};

export default WorkspaceNav;
