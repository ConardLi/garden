"use client";

import React, { useState, Suspense } from 'react';
import { useQueryParams } from "@/hooks/useQueryParams";
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspaceAI from './WorkspaceAI';
import WorkspaceSearch from '../components/WorkspaceSearch';
import { getStoredSearchEngine } from '@/utils/storage';
import useDebounce from '@/hooks/useDebounce';

type QueryParams = Record<"tag" | "toolTag", string>;


interface WorkspaceContentProps {
  activeTag?: string;
  onTagChange: (tag: string) => void;
  selectedToolTags?: string[];
  onToolTagsChange?: (tags: string[]) => void;
}

const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  overflowY: 'auto',
  height: '100vh',
}));

const ModuleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  letterSpacing: '0.5px',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({
  activeTag,
  onTagChange,
  selectedToolTags,
  onToolTagsChange,
}) => {
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const renderTitle = () => {
    return (
      <ModuleTitle>
        AI 工具集
      </ModuleTitle>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        {renderTitle()}
        <Box sx={{ width: '100%', maxWidth: '600px', mb: 4 }}>
          <WorkspaceSearch 
            onSearchEngineChange={handleSearchEngineChange} 
            onSearchTextChange={handleSearchTextChange}
            searchText={searchText}
          />
        </Box>
        
        <Box
          sx={{
            width: '100%',
            maxWidth: '1600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <WorkspaceAI 
              activeTag={activeTag} 
              onTagChange={onTagChange} 
              searchText={debouncedSearchText}
            />
        </Box>
      </Container>
    </Suspense>
  );
};


const Workspace: React.FC = () => {
  const { params, updateParams } = useQueryParams<QueryParams>({
    tag: "写作工具",
    toolTag: "",
  });
  const handleTagChange = (newTag: string) => {
    if (newTag === params.tag) return;
    updateParams({ tag: newTag });
  };

  const handleToolTagChange = (newTags: string[]) => {
    const newTag = newTags[0] || "";
    if (newTag === params.toolTag) return;
    updateParams({ toolTag: newTag });
  };

  return (
    <WorkspaceContent
      activeTag={params.tag}
      onTagChange={handleTagChange}
      selectedToolTags={params.toolTag ? [params.toolTag] : []}
      onToolTagsChange={handleToolTagChange}
    />
  );
};

const PageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Workspace />
    </Suspense>
  );
};

export default PageWithSuspense;
