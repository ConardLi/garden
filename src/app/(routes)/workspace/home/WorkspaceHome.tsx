'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';
import ToolCard from '@/components/workspace/ToolCard';
import SimpleAICard from '@/components/workspace//SimpleAICard';
import { TOOLS } from '@/constants/tools';
import { WEBSITES } from '@/constants/websites';
import { AI_WEBSITES_UNIQUE } from '@/constants/ai';
import { getFavoriteTools, getFavoriteWebsites, getFavoriteAIWebsites } from '@/utils/storage';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(0, 2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const WorkspaceHome: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteTools, setFavoriteTools] = React.useState<string[]>([]);
  const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>([]);
  const [favoriteAIWebsites, setFavoriteAIWebsites] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteTools(getFavoriteTools());
    setFavoriteWebsites(getFavoriteWebsites());
    setFavoriteAIWebsites(getFavoriteAIWebsites());
    setIsLoading(false);
  }, []);

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, '_blank');
  };

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  const favoriteToolsList = TOOLS.filter(tool => favoriteTools.includes(tool.id));
  const favoriteWebsitesList = WEBSITES.filter(website => favoriteWebsites.includes(website.id));
  const favoriteAIWebsitesList = AI_WEBSITES_UNIQUE.filter(website => favoriteAIWebsites.includes(website.title));

  if (isLoading) {
    return <ContentSection />;
  }

  return (
    <ContentSection>
      {favoriteToolsList.length > 0 && (
        <Section>
          <SectionTitle>收藏的工具</SectionTitle>
          <Grid container spacing={1.5}>
            {favoriteToolsList.map((tool) => (
              <Grid item xs={3} sm={2} md={1.5} lg={1} key={tool.id}>
                <ToolCard
                  name={tool.name}
                  icon={tool.icon}
                  onClick={() => handleToolClick(tool.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      {favoriteWebsitesList.length > 0 && (
        <Section>
          <SectionTitle>收藏的网站</SectionTitle>
          <Grid container spacing={1.5}>
            {favoriteWebsitesList.map((website) => (
              <Grid item xs={3} sm={2} md={1.5} lg={1} key={website.id}>
                <ToolCard
                  name={website.name}
                  icon={website.icon}
                  onClick={() => handleWebsiteClick(website.url)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      {favoriteAIWebsitesList.length > 0 && (
        <Section>
          <SectionTitle>收藏的 AI 工具</SectionTitle>
          <Grid container spacing={1.5}>
            {favoriteAIWebsitesList.map((website) => (
              <Grid item xs={3} sm={2} md={1.5} lg={1} key={website.title}>
                <SimpleAICard
                  website={website}
                  onClick={() => handleWebsiteClick(website.url)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}
    </ContentSection>
  );
};

export default WorkspaceHome;
