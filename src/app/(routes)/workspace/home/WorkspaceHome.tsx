"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Grid } from "@mui/material";
import ToolCard from "@/components/workspace/ToolCard";
import SimpleAICard from "@/components/workspace//SimpleAICard";
import AddFavoriteCard from "@/components/workspace/AddFavoriteCard";
import { TOOLS } from "@/constants/tools";
import { WEBSITES } from "@/constants/websites";
import { AI_WEBSITES_UNIQUE } from "@/constants/ai";
import {
  getFavoriteTools,
  getFavoriteWebsites,
  getFavoriteAIWebsites,
} from "@/utils/storage";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  padding: theme.spacing(0, 2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "1rem",
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const WorkspaceHome: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteTools, setFavoriteTools] = React.useState<string[]>([]);
  const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>([]);
  const [favoriteAIWebsites, setFavoriteAIWebsites] = React.useState<string[]>(
    []
  );
  const [websites, setWebsites] = React.useState<any[]>([]);

  const fetchFavoriteWebsites = React.useCallback(async (titles: string[]) => {
    if (titles.length === 0) {
      setWebsites([]);
      return;
    }
    try {
      const params = new URLSearchParams({
        titles: titles.join(","),
        limit: titles.length.toString(),
      });
      const response = await fetch(`/api/websites?${params}`);
      const data = await response.json();

      // 根据 title 去重
      const uniqueWebsites = data.websites.reduce((acc: any[], curr: any) => {
        if (!acc.find((item: any) => item.title === curr.title)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      setWebsites(uniqueWebsites);
    } catch (error) {
      console.error("Error fetching favorite websites:", error);
      setWebsites([]);
    }
  }, []);

  React.useEffect(() => {
    const loadData = async () => {
      const tools = getFavoriteTools();
      const websiteTitles = getFavoriteWebsites();
      const aiWebsites = getFavoriteAIWebsites();

      setFavoriteTools(tools);
      setFavoriteWebsites(websiteTitles);
      setFavoriteAIWebsites(aiWebsites);

      await fetchFavoriteWebsites(websiteTitles);
      setIsLoading(false);
    };
    loadData();
  }, [fetchFavoriteWebsites]);

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, "_blank");
  };

  const handleWebsiteClick = (url: string) => {
    window.open(url, "_blank");
  };

  const favoriteToolsList = TOOLS.filter((tool) =>
    favoriteTools.includes(tool.id)
  );
  const favoriteAIWebsitesList = AI_WEBSITES_UNIQUE.filter((website) =>
    favoriteAIWebsites.includes(website.title)
  );

  if (isLoading) {
    return <ContentSection />;
  }

  return (
    <ContentSection>
      {favoriteToolsList.length > 0 && (
        <Section>
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

            {websites.map((website) => (
              <Grid item xs={3} sm={2} md={1.5} lg={1} key={website.title}>
                <SimpleAICard
                  website={website}
                  onClick={() => handleWebsiteClick(website.url)}
                />
              </Grid>
            ))}

            {favoriteAIWebsitesList.map((website) => (
              <Grid item xs={3} sm={2} md={1.5} lg={1} key={website.title}>
                <SimpleAICard
                  website={website}
                  onClick={() => handleWebsiteClick(website.url)}
                />
              </Grid>
            ))}

            <Grid item xs={3} sm={2} md={1.5} lg={1}>
              <AddFavoriteCard />
            </Grid>
          </Grid>
        </Section>
      )}

      {/* {websites.length > 0 && (
        <Section>
          <Grid container spacing={1.5}>
            {websites.map((website) => (
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

      {favoriteAIWebsitesList.length > 0 && (
        <Section>
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
      )} */}
    </ContentSection>
  );
};

export default WorkspaceHome;
