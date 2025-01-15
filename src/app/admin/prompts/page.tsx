"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { StyledContainer, GlassCard } from "../websites/styles";
import PromptFormDialog from "./components/PromptFormDialog";
import { get, post, put, del } from '@/utils/fe/request';

interface Prompt {
  _id: string;
  title: string;
  description: string;
  prompt: string;
  enTitle: string;
  enDescription: string;
  enPrompt: string;
  source: number;
  tags: string[];
  enTags: string[];
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

interface FilterParams {
  search: string;
  source: string;
  tags: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 0,
  });
  const [filterParams, setFilterParams] = useState<FilterParams>({
    search: "",
    source: "",
    tags: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await get('/api/prompts', {
        page: paginationInfo.page,
        limit: paginationInfo.pageSize,
        ...filterParams,
      });

      setPrompts(data.prompts);
      setPaginationInfo({
        total: data.pagination.total,
        page: data.pagination.page,
        pageSize: data.pagination.limit,
        pages: data.pagination.pages,
      });
    } catch (error) {
      console.error("Error fetching prompts:", error);
    } finally {
      setLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.pageSize, filterParams]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const handleAdd = () => {
    setSelectedPrompt(null);
    setOpenDialog(true);
  };

  const handleEdit = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定要删除这个提示词吗？")) return;

    try {
      await del(`/api/prompts/${id}`);
      fetchPrompts();
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prev) => ({ ...prev, search: event.target.value }));
    setPaginationInfo((prev) => ({ ...prev, page: 1 }));
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    setFilterParams((prev) => ({ ...prev, source: event.target.value }));
    setPaginationInfo((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPaginationInfo((prev) => ({ ...prev, page: newPage }));
  };

  const handleDialogClose = (refresh?: boolean) => {
    setOpenDialog(false);
    if (refresh) {
      fetchPrompts();
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        提示词管理
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          placeholder="搜索提示词..."
          value={filterParams.search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>来源</InputLabel>
          <Select
            value={filterParams.source}
            onChange={handleSourceChange}
            label="来源"
          >
            <MenuItem value="">全部</MenuItem>
            <MenuItem value="0">官方</MenuItem>
            <MenuItem value="1">用户</MenuItem>
            <MenuItem value="99">其他</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          添加提示词
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {prompts?.map((prompt) => (
          <GlassCard key={prompt._id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="h6">{prompt.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {prompt.description}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {prompt.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                </Box>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(prompt)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(prompt._id)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </GlassCard>
        ))}
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={paginationInfo.pages}
          page={paginationInfo.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <PromptFormDialog
        open={openDialog}
        onClose={handleDialogClose}
        prompt={selectedPrompt}
      />
    </StyledContainer>
  );
}
