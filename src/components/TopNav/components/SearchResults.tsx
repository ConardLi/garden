'use client'

import { FC } from 'react';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  Typography,
  Box,
} from '@mui/material';
import { Tool } from '@/types/tool';
import { TAG_TO_ICON } from '@/constants/tools';
import { useRouter } from 'next/navigation';

interface SearchResultsProps {
  tools: Tool[];
  searchTerm: string;
  onClose: () => void;
}

const SearchResults: FC<SearchResultsProps> = ({ tools, searchTerm, onClose }) => {
  const router = useRouter();

  const handleClick = (toolId: string) => {
    router.push(`/tools/${toolId}`);
    onClose();
  };

  if (tools.length === 0) {
    return (
      <Paper
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          mt: 1,
          maxHeight: 400,
          overflow: 'auto',
          zIndex: 1,
        }}
      >
        <Box p={2}>
          <Typography color="text.secondary">
            未找到相关工具
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 1,
        maxHeight: 400,
        overflow: 'auto',
        zIndex: 1,
      }}
    >
      <List>
        {tools.map(tool => {
          const TagIcon = TAG_TO_ICON[tool.tags[0]];
          return (
            <ListItem key={tool.id} disablePadding>
              <ListItemButton onClick={() => handleClick(tool.id)}>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText
                  primary={tool.name}
                  secondary={tool.description}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SearchResults;