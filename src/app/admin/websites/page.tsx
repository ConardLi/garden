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
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { StyledContainer, GlassCard } from "./styles";
import WebsiteFormDialog from "./components/WebsiteFormDialog";
import { get, post, put, del } from "@/utils/fe/request";

interface Website {
  _id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  icon?: string;
  iconType?: string;
  iconValue?: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

interface FilterParams {
  search: string;
  type: string;
}

// 预定义的网站类型
const WEBSITE_TYPES = [
  "browser",
  "app",
  "news",
  "music",
  "tech",
  "photos",
  "life",
  "education",
  "entertainment",
  "shopping",
  "social",
  "read",
  "sports",
  "finance",
  "others",
];

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    type: "",
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isNewWebsite, setIsNewWebsite] = useState(false);

  const fetchWebsites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await get('/api/websites', {
        search: filters.search,
        type: filters.type,
        page: pagination.page,
        limit: pagination.pageSize,
      });
      
      setWebsites(data.websites);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination.total,
        pages: data.pagination.pages,
      }));
    } catch (error) {
      console.error("Failed to fetch websites:", error);
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAdd = () => {
    setIsNewWebsite(true);
    setSelectedWebsite(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (website: Website) => {
    setIsNewWebsite(false);
    setSelectedWebsite(website);
    setFormDialogOpen(true);
  };

  const handleDelete = (website: Website) => {
    setSelectedWebsite(website);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData: Omit<Website, "_id">) => {
    try {
      if (isNewWebsite) {
        await post('/api/websites', formData);
      } else {
        await put(`/api/websites/${selectedWebsite?._id}`, formData);
      }
      setFormDialogOpen(false);
      fetchWebsites();
    } catch (error) {
      console.error("Failed to submit website:", error);
      throw new Error("操作失败");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedWebsite) return;

    try {
      await del(`/api/websites/${selectedWebsite._id}`);
      setDeleteDialogOpen(false);
      fetchWebsites();
    } catch (error) {
      console.error("Failed to delete website:", error);
      alert("删除失败，请重试");
    }
  };

  return (
    <StyledContainer>
      <GlassCard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h1">
            网站管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            添加
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            placeholder="搜索..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            onKeyPress={handleSearchKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>类型</InputLabel>
            <Select
              value={filters.type}
              label="类型"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <MenuItem value="">全部</MenuItem>
              {WEBSITE_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    width: "48px",
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  图标
                </th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>标题</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>描述</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>类型</th>
                <th
                  style={{
                    width: "200px",
                    padding: "12px 8px",
                    textAlign: "left",
                  }}
                >
                  URL
                </th>
                <th
                  style={{
                    width: "100px",
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    加载中...
                  </td>
                </tr>
              ) : websites.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    暂无数据
                  </td>
                </tr>
              ) : (
                websites.map((website) => (
                  <tr key={website._id}>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      {website.icon ? (
                        website.iconType === "svg" ? (
                          <Box
                            component="div"
                            sx={{
                              width: 32,
                              height: 32,
                              margin: "0 auto",
                              borderRadius: "8px",
                              overflow: "hidden",
                              "& svg": {
                                width: "100%",
                                height: "100%",
                              },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: website.iconValue || "",
                            }}
                          />
                        ) : (
                          <Box
                            component="img"
                            src={website.icon}
                            alt={website.title}
                            sx={{
                              width: 32,
                              height: 32,
                              margin: "0 auto",
                              borderRadius: "8px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )
                      ) : (
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            margin: "0 auto",
                            borderRadius: "8px",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#999",
                            fontSize: "12px",
                          }}
                        >
                          无
                        </Box>
                      )}
                    </td>
                    <td style={{ padding: "12px 8px" }}>{website.title}</td>
                    <td style={{ padding: "12px 8px" }}>
                      {website.description}
                    </td>
                    <td style={{ padding: "12px 8px" }}>{website.type}</td>
                    <td
                      style={{
                        padding: "12px 8px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#1976d2",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        {website.url}
                      </a>
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleEdit(website)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(website)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            gap: 2,
          }}
        >
          <Pagination
            count={pagination.pages}
            page={pagination.page}
            onChange={(event, value) => {
              setPagination((prev) => ({ ...prev, page: value }));
            }}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
          <Typography variant="body2" color="text.secondary">
            共 {pagination.total} 条
          </Typography>
        </Box>
      </GlassCard>

      <WebsiteFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedWebsite}
        title={isNewWebsite ? "添加网站" : "编辑网站"}
        websiteTypes={WEBSITE_TYPES}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          确定要删除 {selectedWebsite?.title} 吗？此操作不可恢复。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}
