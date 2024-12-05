"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import TagFilter from "@/components/workspace/TagFilter";
import VirtualGrid from "@/components/workspace/VirtualGrid";
import { getFavoritePrompts, toggleFavoritePrompt } from "@/utils/storage";
import { PROMPT_TAGS } from "@/constants/prompts";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1600px",
  padding: theme.spacing(0, 4),
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

const PromptCard = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-2px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
}));

const CardTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.1rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "rgba(255, 255, 255, 0.95)",
  lineHeight: 1.2,
  marginBottom: "4px",
});

const CardDescription = styled(Typography)({
  color: "rgba(255, 255, 255, 0.8)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  lineHeight: 1.4,
  fontSize: "0.95rem",
  flex: 1,
  minHeight: 0,
});

const TagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  gap: theme.spacing(0.8),
  marginTop: "auto",
  paddingTop: theme.spacing(1.5),
  overflow: "hidden",
}));

const Tag = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  borderRadius: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1.2),
  fontSize: "0.8rem",
  color: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
}));

const MoreTags = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1.2),
  fontSize: "0.8rem",
  color: "rgba(255, 255, 255, 0.7)",
  whiteSpace: "nowrap",
}));

interface Prompt {
  _id: string;
  title: string;
  description: string;
  prompt: string;
  enTitle: string;
  enDescription: string;
  enPrompt: string;
  tags: string[];
  enTags: string[];
}

interface WorkspacePromptsProps {
  searchText?: string;
}

const WorkspacePrompts: React.FC<WorkspacePromptsProps> = React.memo(
  ({ searchText = "" }) => {
    const [favoritePrompts, setFavoritePrompts] = React.useState<string[]>([]);
    const [prompts, setPrompts] = React.useState<Prompt[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [selectedTag, setSelectedTag] = React.useState<string>("");
    const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(
      null
    );

    // 获取提示词数据
    const fetchPrompts = React.useCallback(async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchText) {
          queryParams.append("search", searchText);
        }
        if (selectedTag) {
          queryParams.append("tags", selectedTag);
        }
        queryParams.append("page", page.toString());
        queryParams.append("limit", "25");

        const response = await fetch(`/api/prompts?${queryParams.toString()}`);
        if (!response.ok) throw new Error("获取提示词列表失败");
        const data = await response.json();
        setPrompts(data.prompts || []);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
        setPrompts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [selectedTag, searchText, page]);

    React.useEffect(() => {
      fetchPrompts();
    }, [fetchPrompts]);

    React.useEffect(() => {
      setFavoritePrompts(getFavoritePrompts());
    }, []);

    // 重置页码当标签或搜索改变时
    React.useEffect(() => {
      setPage(1);
    }, [selectedTag, searchText]);

    const handleFavoriteToggle = React.useCallback((promptId: string) => {
      const newFavorites = toggleFavoritePrompt(promptId);
      setFavoritePrompts(newFavorites);
    }, []);

    const handleTagChange = React.useCallback((newTags: string[]) => {
      setSelectedTag(newTags[0] || "");
    }, []);

    const handlePageChange = React.useCallback(
      (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      []
    );

    const handlePromptClick = React.useCallback((prompt: Prompt) => {
      setSelectedPrompt(prompt);
    }, []);

    const handleCloseDialog = () => {
      setSelectedPrompt(null);
    };

    const renderItem = React.useCallback(
      (prompt: Prompt, style: React.CSSProperties) => {
        const visibleTags = prompt.tags.slice(0, 2);
        const remainingTags = prompt.tags.length - 2;

        // 创建一个新的 Box 来处理 VirtualGrid 的 padding
        return (
          <Box style={style}>
            <Tooltip
              title={
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {prompt.description}
                  </Typography>
                  {prompt.tags.length > 0 && (
                    <Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {prompt.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              }
              placement="top"
              arrow
            >
              <PromptCard
                key={prompt._id}
                onClick={() => handlePromptClick(prompt)}
              >
                <CardTitle variant="h6">{prompt.title}</CardTitle>
                <CardDescription>{prompt.description}</CardDescription>
                <TagsContainer>
                  {visibleTags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {remainingTags > 0 && <MoreTags>+{remainingTags}</MoreTags>}
                </TagsContainer>
              </PromptCard>
            </Tooltip>
          </Box>
        );
      },
      [handlePromptClick]
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
          <TagFilter<string>
            tags={PROMPT_TAGS}
            selectedTags={selectedTag ? [selectedTag] : []}
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
            <Box sx={{ px: 2 }}>
              <VirtualGrid
                items={prompts}
                itemHeight={175}
                minItemWidth={300}
                gap={16}
                renderItem={renderItem}
              />
            </Box>
            <PaginationContainer>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                size="large"
                shape="rounded"
              />
            </PaginationContainer>
          </>
        )}

        <Dialog
          open={!!selectedPrompt}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedPrompt && (
            <>
              <DialogTitle>{selectedPrompt.title}</DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {selectedPrompt.description}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  提示词内容：
                </Typography>
                <Typography
                  component="pre"
                  sx={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    padding: 2,
                    borderRadius: 1,
                    overflow: "auto",
                    maxHeight: "400px",
                  }}
                >
                  {selectedPrompt.prompt}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>关闭</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </ContentSection>
    );
  }
);

WorkspacePrompts.displayName = "WorkspacePrompts";

export default WorkspacePrompts;
