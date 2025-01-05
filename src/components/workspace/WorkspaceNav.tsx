'use client';

import { styled } from '@mui/material/styles';
import { Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { UserAvatar } from './components/UserAvatar';
import { NavItem } from './components/NavItem';

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
        <UserAvatar />
      </TopSection>

      <MainSection>
        <NavList>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </NavList>
      </MainSection>

      <BottomSection>
        <NavList>
          <NavItem
            id="settings"
            label="设置"
            icon={<SettingsIcon />}
            onClick={() => {}}
          />
        </NavList>
      </BottomSection>
    </NavContainer>
  );
};

export default WorkspaceNav;
