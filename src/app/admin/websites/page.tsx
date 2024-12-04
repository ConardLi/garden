'use client';

import { useState, useCallback, useEffect } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { StyledContainer, GlassCard } from './styles';
import WebsiteFormDialog from './components/WebsiteFormDialog';

interface Website {
  _id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  icon?: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
}

interface FilterParams {
  search: string;
  type: string;
}

// 预定义的网站类型
const WEBSITE_TYPES = [
  'browser',
  'app',
  'news',
  'music',
  'tech',
  'photos',
  'life',
  'education',
  'entertainment',
  'shopping',
  'social',
  'read',
  'sports',
  'finance',
  'others'
];

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [allWebsites, setAllWebsites] = useState<Website[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
    type: '',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isNewWebsite, setIsNewWebsite] = useState(false);

  const fetchWebsites = useCallback(async () => {
    try {
      setLoading(true);
      // 构建查询参数
      const queryParams = new URLSearchParams();
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      if (filters.type) {
        queryParams.append('type', filters.type);
      }

      const response = await fetch(`/api/websites?${queryParams.toString()}`);
      if (!response.ok) throw new Error('获取网站列表失败');
      const data = await response.json();
      
      // 确保数据是数组
      const websitesList = Array.isArray(data) ? data : (data.websites || []);
      setAllWebsites(websitesList);
      setWebsites(websitesList);
      setPagination(prev => ({ ...prev, total: websitesList.length }));
    } catch (error) {
      console.error('Failed to fetch websites:', error);
      setAllWebsites([]);
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const handleSearch = () => {
    // 搜索已经通过 useEffect 自动触发
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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

  const handleFormSubmit = async (formData: Omit<Website, '_id'>) => {
    const url = isNewWebsite ? '/api/websites' : `/api/websites/${selectedWebsite?._id}`;
    const method = isNewWebsite ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(isNewWebsite ? '创建失败' : '更新失败');
    }

    fetchWebsites();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedWebsite) return;

    try {
      const response = await fetch(`/api/websites/${selectedWebsite._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('删除失败');
      
      await fetchWebsites();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete website:', error);
    }
  };

  return (
    <StyledContainer>
      <GlassCard>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            网站管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            新增网站
          </Button>
        </Box>

        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="搜索网站..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            onKeyPress={handleSearchKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    size="small"
                    sx={{ minWidth: 'auto' }}
                  >
                    搜索
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>类型</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              label="类型"
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

        <Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <Typography>加载中...</Typography>
            </Box>
          ) : (
            websites.map((website) => (
              <Box
                key={website._id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {website.icon && (
                    <img
                      src={website.icon}
                      alt={website.title}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="h6" sx={{ color: '#1a237e' }}>
                      {website.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {website.type.charAt(0).toUpperCase() + website.type.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {website.url}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {website.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => handleEdit(website)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(website)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <WebsiteFormDialog
          open={formDialogOpen}
          onClose={() => setFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={selectedWebsite || undefined}
          title={isNewWebsite ? '新增网站' : '编辑网站'}
          websiteTypes={WEBSITE_TYPES}
        />

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
            }
          }}
        >
          <DialogTitle>确认删除</DialogTitle>
          <DialogContent>
            确定要删除网站 "{selectedWebsite?.title}" 吗？此操作不可撤销。
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              删除
            </Button>
          </DialogActions>
        </Dialog>
      </GlassCard>
    </StyledContainer>
  );
}
