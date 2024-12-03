"use client";

import React, { useState, useEffect } from 'react';
import { useQueryParams } from "@/hooks/useQueryParams";
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspaceWebsites from './WorkspaceWebsites';
import WorkspaceSearch from '../components/WorkspaceSearch';
import { getStoredSearchEngine } from '@/utils/storage';
import useDebounce from '@/hooks/useDebounce';
import { WebsiteType } from '@/constants/websites';

interface WorkspaceContentProps {
  activeTag: WebsiteType;
  onTagChange: (tag: WebsiteType) => void;
}

const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  height: '100vh',
}));

const ContentWrapper = styled(Box)({
  flex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
});

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
        常用网站导航
      </ModuleTitle>
    );
  };

  return (
    <Container>
      {renderTitle()}
      <Box sx={{ width: '100%', maxWidth: '600px', mb: 4 }}>
        <WorkspaceSearch 
          onSearchEngineChange={handleSearchEngineChange} 
          onSearchTextChange={handleSearchTextChange}
          searchText={searchText}
        />
      </Box>
      
      <ContentWrapper>
        <WorkspaceWebsites 
          activeTag={activeTag} 
          onTagChange={onTagChange} 
          searchText={debouncedSearchText}
        />
      </ContentWrapper>
    </Container>
  );
};

const Workspace = () => {
  const { params, updateParams } = useQueryParams<{ tag: string }>({ tag: 'app' });
  const [activeTag, setActiveTag] = useState<WebsiteType>('app');

  // 从 URL 参数同步到状态
  useEffect(() => {
    if (params.tag && params.tag !== activeTag) {
      setActiveTag(params.tag as WebsiteType);
    }
  }, [params.tag]);

  const handleTagChange = (tag: WebsiteType) => {
    setActiveTag(tag);
    updateParams({ tag });
  };

  return (
    <WorkspaceContent
      activeTag={activeTag}
      onTagChange={handleTagChange}
    />
  );
};

export default Workspace;
