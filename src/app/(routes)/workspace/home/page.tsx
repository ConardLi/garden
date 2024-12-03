"use client";

import React, { useState, useEffect } from 'react';
import { useQueryParams } from "@/hooks/useQueryParams";
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspaceHome from './WorkspaceHome';
import WorkspaceSearch from '../components/WorkspaceSearch';
import { formatDate } from '@/utils/date';
import { getStoredSearchEngine } from '@/utils/storage';

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

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '5rem',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 400,
  textAlign: 'center',
  marginBottom: 0,
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  fontWeight: 400,
}));

const TimeDisplay = React.memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeText suppressHydrationWarning>
      {currentTime.toLocaleTimeString()}
    </TimeText>
  );
});

const DateDisplay = React.memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <DateText>
      {formatDate(currentDate)}
    </DateText>
  );
});

const WorkspaceContent: React.FC<WorkspaceContentProps> = () => {
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');
  const [searchText, setSearchText] = useState('');

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const renderTime = () => {
    return (
      <>
        <TimeDisplay />
        <DateDisplay />
      </>
    );
  };

  return (
    <Container>
      {renderTime()}
      {/* {renderTitle()} */}
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
        <WorkspaceHome />
      </Box>
    </Container>
  );
};


const Workspace: React.FC = () => {
  const { params, updateParams } = useQueryParams<QueryParams>({
    tag: "",
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

export default Workspace;
