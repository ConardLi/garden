"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { PROMPT_TAGS } from "@/constants/prompts";
import { getFavoritePrompts, toggleFavoritePrompt } from "@/utils/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { Prompt } from "./types";
import PromptList from "./components/PromptList";
import PromptSidebar from "./components/PromptSidebar";
import PromptDialog from "./components/PromptDialog";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  display: "flex",
  gap: theme.spacing(3),
}));

interface WorkspacePromptsProps {
  searchText?: string;
}

const WorkspacePrompts: React.FC<WorkspacePromptsProps> = React.memo(
  ({ searchText = "" }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [favoritePrompts, setFavoritePrompts] = React.useState<string[]>([]);
    const [prompts, setPrompts] = React.useState<Prompt[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [selectedTag, setSelectedTag] = React.useState<string>("");
    const [selectedPromptId, setSelectedPromptId] = React.useState<string | null>(null);

    // 从 URL 恢复状态
    React.useEffect(() => {
      const tag = searchParams.get("tag") || "";
      const pageParam = searchParams.get("page");
      setSelectedTag(tag);
      setPage(pageParam ? parseInt(pageParam, 10) : 1);
    }, [searchParams]);

    // 更新 URL
    const updateURL = React.useCallback((newTag: string, newPage: number) => {
      const params = new URLSearchParams();
      if (newTag) {
        params.set("tag", newTag);
      }
      if (newPage > 1) {
        params.set("page", newPage.toString());
      }
      const query = params.toString();
      router.push(query ? `?${query}` : "");
    }, [router]);

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
        queryParams.append("limit", "16");

        const response = await fetch(`/api/prompts?${queryParams.toString()}`);
        if (!response.ok) throw new Error("获取提示词列表失败");
        const data = await response.json();

        setPrompts(data.prompts);
        setTotalPages(data.totalPages);
        setFavoritePrompts(getFavoritePrompts());
      } catch (error) {
        console.error("获取提示词列表失败:", error);
      } finally {
        setLoading(false);
      }
    }, [page, searchText, selectedTag]);

    React.useEffect(() => {
      fetchPrompts();
    }, [fetchPrompts]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      updateURL(selectedTag, value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleTagChange = (tag: string) => {
      setSelectedTag(tag);
      setPage(1);
      updateURL(tag, 1);
    };

    const handlePromptClick = (prompt: Prompt) => {
      setSelectedPromptId(prompt._id);
    };

    const handleCloseDialog = () => {
      setSelectedPromptId(null);
    };

    return (
      <ContentSection>
        <PromptSidebar
          tags={PROMPT_TAGS}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
        />
        <PromptList
          prompts={prompts}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPromptClick={handlePromptClick}
        />
        <PromptDialog
          promptId={selectedPromptId}
          onClose={handleCloseDialog}
        />
      </ContentSection>
    );
  }
);

WorkspacePrompts.displayName = "WorkspacePrompts";

export default WorkspacePrompts;
