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
  Pagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { StyledContainer, GlassCard } from '../websites/styles';
import AISiteFormDialog from './components/AISiteFormDialog';
import { get, post, put, del } from '@/utils/fe/request';

interface AISite {
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

// 预定义的 AI 工具类型
const AI_SITE_TYPES = [
  'chat',
  'image',
  'audio',
  'video',
  'code',
  'writing',
  'translation',
  'search',
  'productivity',
  'others'
];

export default function AISitesPage() {
  const [aisites, setAISites] = useState<AISite[]>([]);
  const [allAISites, setAllAISites] = useState<AISite[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
    type: '',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAISite, setSelectedAISite] = useState<AISite | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isNewAISite, setIsNewAISite] = useState(false);

  const fetchAISites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await get('/api/aisites', {
        search: filters.search,
        type: filters.type,
        page: pagination.page,
        limit: pagination.pageSize,
      });
      
      setAISites(data.aisites);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        pages: data.pagination.pages,
      }));
    } catch (error) {
      console.error('Failed to fetch AI sites:', error);
      setAISites([]);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchAISites();
  }, [fetchAISites]);

  const handleSearch = () => {
    // 搜索已经通过 useEffect 自动触发
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAdd = () => {
    setIsNewAISite(true);
    setSelectedAISite(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (aisite: AISite) => {
    setIsNewAISite(false);
    setSelectedAISite(aisite);
    setFormDialogOpen(true);
  };

  const handleDelete = (aisite: AISite) => {
    setSelectedAISite(aisite);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData: Omit<AISite, '_id'>) => {
    try {
      if (isNewAISite) {
        await post('/api/aisites', formData);
      } else {
        await put(`/api/aisites/${selectedAISite?._id}`, formData);
      }
      setFormDialogOpen(false);
      fetchAISites();
    } catch (error) {
      console.error('Failed to save AI site:', error);
      alert('保存失败，请重试');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAISite) return;

    try {
      await del(`/api/aisites/${selectedAISite._id}`);
      setDeleteDialogOpen(false);
      fetchAISites();
    } catch (error) {
      console.error('Failed to delete AI site:', error);
      alert('删除失败，请重试');
    }
  };

  return (
    <StyledContainer>
      <GlassCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            AI 工具管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            添加
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="搜索..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <MenuItem value="">全部</MenuItem>
              {AI_SITE_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: '48px', padding: '12px 8px', textAlign: 'center' }}>图标</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>标题</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>描述</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>类型</th>
                <th style={{ width: '200px', padding: '12px 8px', textAlign: 'left' }}>URL</th>
                <th style={{ width: '100px', padding: '12px 8px', textAlign: 'center' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>加载中...</td>
                </tr>
              ) : aisites.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>暂无数据</td>
                </tr>
              ) : (
                aisites.map((aisite) => (
                  <tr key={aisite._id}>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      {aisite.icon ? (
                        aisite.iconType === 'svg' ? (
                          <Box
                            component="div"
                            sx={{
                              width: 32,
                              height: 32,
                              margin: '0 auto',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              '& svg': {
                                width: '100%',
                                height: '100%',
                              },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: aisite.iconValue || '',
                            }}
                          />
                        ) : (
                          <Box
                            component="img"
                            src={aisite.icon}
                            alt={aisite.title}
                            sx={{
                              width: 32,
                              height: 32,
                              margin: '0 auto',
                              borderRadius: '8px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        )
                      ) : (
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            margin: '0 auto',
                            borderRadius: '8px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '12px',
                          }}
                        >
                          无
                        </Box>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px' }}>{aisite.title}</td>
                    <td style={{ padding: '12px 8px' }}>{aisite.description}</td>
                    <td style={{ padding: '12px 8px' }}>{aisite.type}</td>
                    <td style={{ 
                      padding: '12px 8px',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      <a 
                        href={aisite.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: '#1976d2',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        {aisite.url}
                      </a>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <IconButton 
                        onClick={() => handleEdit(aisite)} 
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(aisite)} 
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

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
          gap: 2 
        }}>
          <Pagination
            count={pagination.pages}
            page={pagination.page}
            onChange={(event, value) => {
              setPagination(prev => ({ ...prev, page: value }));
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

      <AISiteFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSubmit={handleFormSubmit}
        aisite={selectedAISite}
        isNew={isNewAISite}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          确定要删除 {selectedAISite?.title} 吗？此操作不可恢复。
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
