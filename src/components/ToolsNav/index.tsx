'use client';

import { FC, useState } from 'react';
import { Box, List, Drawer, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import { TOOLS, TAGS, TAG_TO_ICON } from '../../constants/tools';
import { DRAWER_WIDTH } from './styles';
import NavItem from './components/NavItem';
import NavGroup from './components/NavGroup';
import { getToolPath, getHomePath } from '../../utils/navigation';

const ToolsNav: FC<{ open?: boolean }> = ({ open = true }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>(
    TAGS.reduce((acc, tag) => ({ ...acc, [tag]: true }), {})
  );

  const toggleTag = (tag: string) => {
    setExpandedTags(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  const toolsByTag = TAGS.reduce((acc, tag) => {
    acc[tag] = TOOLS.filter(tool => tool.tags.includes(tag));
    return acc;
  }, {} as Record<string, typeof TOOLS>);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          background: theme => theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.8)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          工具导航
        </Typography>
      </Box>

      <List component="nav" sx={{ pt: 1 }}>
        <NavItem
          icon={<HomeIcon fontSize="small" />}
          label="全部工具"
          selected={pathname === '/' || pathname === '/index.html'}
          onClick={() => handleNavigate(getHomePath())}
        />

        {TAGS.map(tag => {
          const toolsInTag = toolsByTag[tag];
          if (toolsInTag.length === 0) return null;
          const TagIcon = TAG_TO_ICON[tag];

          return (
            <NavGroup
              key={tag}
              icon={<TagIcon fontSize="small" />}
              label={tag}
              expanded={expandedTags[tag]}
              onToggle={() => toggleTag(tag)}
              tools={toolsInTag}
              currentPath={pathname}
              onToolSelect={(toolId) => handleNavigate(getToolPath(toolId))}
            />
          );
        })}
      </List>
    </Drawer>
  );
};

export default ToolsNav; 