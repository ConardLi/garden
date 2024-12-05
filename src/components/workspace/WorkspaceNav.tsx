import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemIcon, Tooltip, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TopSection = styled(Box)({
  marginBottom: 'auto',
});

const MainSection = styled(Box)({
  flex: '0 0 auto',
});

const BottomSection = styled(Box)({
  marginTop: 'auto',
});

const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: 0,

  '& .MuiListItem-root': {
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

interface WorkspaceNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: '主页', icon: <HomeIcon /> },
  { id: 'tools', label: '工具', icon: <BuildIcon /> },
  { id: 'websites', label: '网站', icon: <LanguageIcon /> },
  { id: 'ai', label: 'AI', icon: <SmartToyIcon /> },
  { id: 'prompts', label: '提示词', icon: <AutoAwesomeIcon /> },
];

const WorkspaceNav: React.FC<WorkspaceNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <NavContainer>
      <TopSection>
        <Tooltip title="登录" placement="right" arrow>
          <StyledAvatar />
        </Tooltip>
      </TopSection>

      <MainSection>
        <NavList>
          {navItems.map((item) => (
            <Tooltip title={item.label} placement="right" arrow key={item.id}>
              <ListItem
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => onTabChange(item.id)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <div className="nav-label">{item.label}</div>
              </ListItem>
            </Tooltip>
          ))}
        </NavList>
      </MainSection>

      <BottomSection>
        <NavList>
          <Tooltip title="设置" placement="right" arrow>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        </NavList>
      </BottomSection>
    </NavContainer>
  );
};

export default WorkspaceNav;
