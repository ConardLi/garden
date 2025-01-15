"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Pagination } from "@mui/material";
import AICard from "@/components/workspace/AICard";
import TagFilter from "@/components/workspace/TagFilter";
import VirtualGrid from "@/components/workspace/VirtualGrid";
import { getFavoriteWebsites, toggleFavoriteWebsite } from "@/utils/fe/storage";
import {
  WEBSITE_TYPES,
  TYPE_TO_ICON,
  TYPE_TO_LABEL,
  WebsiteType,
} from "@/constants/websites";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1600px",
  padding: theme.spacing(0, 2),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(1),
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

interface Website {
  _id: string;
  title: string;
  url: string;
  icon: string;
  type: WebsiteType;
  iconType: string;
  iconValue?: string;
  description?: string;
  tags: string[];
}

interface WorkspaceWebsitesProps {
  activeTag?: WebsiteType;
  onTagChange: (tag: WebsiteType) => void;
  searchText?: string;
}

const LIMIT = 25;

const WorkspaceWebsites: React.FC<WorkspaceWebsitesProps> = React.memo(
  ({ activeTag = "app", onTagChange, searchText = "" }) => {
    const [websites, setWebsites] = React.useState<Website[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>(
      []
    );

    const fetchWebsites = React.useCallback(async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchText) {
          queryParams.append("search", searchText);
        }
        if (activeTag && activeTag !== "全部") {
          queryParams.append("type", activeTag);
        }
        queryParams.append("page", page.toString());
        queryParams.append("limit", LIMIT.toString());

        const response = await fetch(`/api/websites?${queryParams.toString()}`);
        if (!response.ok) throw new Error("获取网站列表失败");
        const data = await response.json();
        setWebsites(data.websites || []);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch websites:", error);
        setWebsites([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [activeTag, searchText, page]);

    React.useEffect(() => {
      fetchWebsites();
    }, [fetchWebsites]);

    React.useEffect(() => {
      setFavoriteWebsites(getFavoriteWebsites());
    }, []);

    // 重置页码当标签或搜索改变时
    React.useEffect(() => {
      setPage(1);
    }, [activeTag, searchText]);

    const handleWebsiteClick = React.useCallback((url: string) => {
      window.open(url, "_blank");
    }, []);

    const handleFavoriteToggle = React.useCallback((websiteTitle: string) => {
      const newFavorites = toggleFavoriteWebsite(websiteTitle);
      setFavoriteWebsites(newFavorites);
    }, []);

    const handleTagChange = React.useCallback(
      (newTags: WebsiteType[]) => {
        const newTag = newTags.length > 0 ? newTags[0] : "app";
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
      (website: Website, style: React.CSSProperties) => {
        return (
          <AICard
            key={website._id}
            website={{
              title: website.title,
              url: website.url,
              icon: website.icon,
              iconType: website.iconType,
              iconValue: website.iconValue,
              description: website.description || "",
              // @ts-ignore
              tags: [TYPE_TO_LABEL[website.type]],
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
          <TagFilter<WebsiteType>
            tags={WEBSITE_TYPES}
            selectedTags={[activeTag]}
            tagToIcon={TYPE_TO_ICON}
            tagToLabel={TYPE_TO_LABEL}
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

WorkspaceWebsites.displayName = "WorkspaceWebsites";

export default WorkspaceWebsites;
