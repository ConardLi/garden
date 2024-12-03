import { FC } from 'react';
import { Box, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { primaryNavItemStyles } from '../styles';
import NavItem from './NavItem';
import { Tool } from '../../../types/tool';

interface NavGroupProps {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  tools: Tool[];
  currentPath: string;
  onToolSelect: (toolId: string) => void;
}

const NavGroup: FC<NavGroupProps> = ({
  icon,
  label,
  expanded,
  onToggle,
  tools,
  currentPath,
  onToolSelect
}) => (
  <Box>
    <ListItemButton onClick={onToggle} sx={primaryNavItemStyles}>
      <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          variant: 'subtitle2',
          color: 'text.secondary',
          fontWeight: 'medium'
        }}
      />
      {expanded ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {tools.map(tool => (
          <NavItem
            key={tool.id}
            label={tool.name}
            selected={currentPath === `/tools/${tool.id}`}
            onClick={() => onToolSelect(tool.id)}
            variant="secondary"
          />
        ))}
      </List>
    </Collapse>
  </Box>
);

export default NavGroup; 