"use client";

import React, { useState, Suspense } from 'react';
import { useQueryParams } from "@/hooks/useQueryParams";
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspacePrompts from './main';
import WorkspaceSearch from '../components/WorkspaceSearch';
import useDebounce from '@/hooks/useDebounce';

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

const Workspace = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const renderTitle = () => {
    return (
      <ModuleTitle>
        AI 提示词库
      </ModuleTitle>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        {renderTitle()}
        <Box sx={{ width: '100%', maxWidth: '600px', mb: 4 }}>
          <WorkspaceSearch 
            onSearchTextChange={handleSearchTextChange}
            searchText={searchText}
            // @ts-ignore
            hideSearchEngine
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
          <WorkspacePrompts searchText={debouncedSearchText} />
        </Box>
      </Container>
    </Suspense>
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
