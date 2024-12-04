"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Pagination } from "@mui/material";
import AICard from "@/components/workspace/AICard";
import TagFilter from "@/components/workspace/TagFilter";
import VirtualGrid from "@/components/workspace/VirtualGrid";
import { AI_TAGS, TAG_TO_ICON } from "@/constants/ai";
import {
  getFavoriteAIWebsites,
  toggleFavoriteAIWebsite,
} from "@/utils/storage";
import { AITagType } from "@/types/ai";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1600px",
  padding: theme.spacing(0, 2),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  "& .MuiPagination-ul": {
    "& .MuiPaginationItem-root": {
      color: "rgba(255, 255, 255, 0.85)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
      "&.Mui-selected": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
  },
}));

interface AIWebsite {
  title: string;
  description: string;
  url: string;
  icon?: string;
  type: string;
}

interface WorkspaceAIProps {
  activeTag?: string;
  onTagChange: (tag: string) => void;
  searchText?: string;
}

const WorkspaceAI: React.FC<WorkspaceAIProps> = React.memo(
  ({ activeTag = "写作工具", onTagChange, searchText = "" }) => {
    const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>(
      []
    );
    const [websites, setWebsites] = React.useState<AIWebsite[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    // 获取 AI 网站数据
    const fetchAISites = React.useCallback(async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchText) {
          queryParams.append("search", searchText);
        }
        if (activeTag) {
          queryParams.append("type", activeTag);
        }
        queryParams.append("page", page.toString());
        queryParams.append("limit", "25");

        const response = await fetch(`/api/aisites?${queryParams.toString()}`);
        if (!response.ok) throw new Error("获取 AI 网站列表失败");
        const data = await response.json();
        setWebsites(data.aisites || []);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch AI sites:", error);
        setWebsites([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [activeTag, searchText, page]);

    React.useEffect(() => {
      fetchAISites();
    }, [fetchAISites]);

    React.useEffect(() => {
      setFavoriteWebsites(getFavoriteAIWebsites());
    }, []);

    // 重置页码当标签或搜索改变时
    React.useEffect(() => {
      setPage(1);
    }, [activeTag, searchText]);

    const handleWebsiteClick = React.useCallback((url: string) => {
      window.open(url, "_blank");
    }, []);

    const handleFavoriteToggle = React.useCallback((websiteTitle: string) => {
      const newFavorites = toggleFavoriteAIWebsite(websiteTitle);
      setFavoriteWebsites(newFavorites);
    }, []);

    const handleTagChange = React.useCallback(
      (newTags: AITagType[]) => {
        const newTag = newTags.length > 0 ? newTags[0] : "写作工具";
        onTagChange(newTag);
      },
      [onTagChange]
    );

    const handlePageChange = React.useCallback(
      (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      []
    );

    const renderItem = React.useCallback(
      (website, style) => {
        return (
          <AICard
            key={website.title}
            website={{
              ...website,
              tags: [website.type], // 适配原有的 tags 结构
            }}
            onClick={() => handleWebsiteClick(website.url)}
            onFavoriteToggle={() => handleFavoriteToggle(website.title)}
            favoriteWebsites={favoriteWebsites}
            style={style}
          />
        );
      },
      [handleWebsiteClick, handleFavoriteToggle, favoriteWebsites]
    );

    return (
      <ContentSection>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mb: 4,
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          <TagFilter<AITagType>
            tags={AI_TAGS}
            selectedTags={[activeTag as AITagType]}
            tagToIcon={TAG_TO_ICON}
            onTagChange={handleTagChange}
            singleSelect
          />
        </Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <Typography>加载中...</Typography>
          </Box>
        ) : (
          <>
            <VirtualGrid
              items={websites}
              itemHeight={100}
              minItemWidth={300}
              gap={16}
              renderItem={renderItem}
            />
            <PaginationContainer>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                size="large"
                shape="rounded"
                variant="outlined"
              />
            </PaginationContainer>
          </>
        )}
      </ContentSection>
    );
  }
);

WorkspaceAI.displayName = "WorkspaceAI";

export default WorkspaceAI;
