'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save as SaveIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { AI_TAGS } from '@/constants/ai';

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

interface AISiteFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<AISite, '_id'>) => void;
  aisite: AISite | null;
  isNew: boolean;
}

// 移除 '全部' 标签，因为它只用于筛选
const AI_SITE_TYPES = AI_TAGS.filter(tag => tag !== '全部');

export default function AISiteFormDialog({
  open,
  onClose,
  onSubmit,
  aisite,
  isNew,
}: AISiteFormDialogProps) {
  const [formData, setFormData] = useState<Omit<AISite, '_id'>>({
    title: '',
    description: '',
    type: '',
    url: '',
    icon: '',
    iconType: '',
    iconValue: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (aisite) {
      setFormData({
        title: aisite.title,
        description: aisite.description,
        type: aisite.type,
        url: aisite.url,
        icon: aisite.icon || '',
        iconType: aisite.iconType || '',
        iconValue: aisite.iconValue || '',
      });
      setPreviewUrl(aisite.icon || '');
    } else {
      setFormData({
        title: '',
        description: '',
        type: '',
        url: '',
        icon: '',
        iconType: '',
        iconValue: '',
      });
      setPreviewUrl('');
    }
  }, [aisite]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError('只支持上传图片');
      return;
    }

    // 验证文件大小（2MB）
    if (file.size > 2 * 1024 * 1024) {
      setError('文件大小不能超过2MB');
      return;
    }

    // 显示预览
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);

    // 上传文件
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '上传失败');
      }

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, icon: url }));
    } catch (error) {
      setError(error instanceof Error ? error.message : '上传失败');
      setPreviewUrl('');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : '操作失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          {isNew ? '添加 AI 工具' : '编辑 AI 工具'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="标题"
              type="text"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="描述"
              type="text"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>类型</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {AI_SITE_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="url"
              label="URL"
              type="url"
              fullWidth
              value={formData.url}
              onChange={handleChange}
              required
            />
            {isNew && (
              <Box sx={{ mt: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="icon-upload"
                />
                <label htmlFor="icon-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    disabled={uploading}
                    sx={{ mr: 2 }}
                  >
                    {uploading ? '上传中...' : '上传图标'}
                  </Button>
                </label>
                {previewUrl && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={previewUrl} 
                      alt="预览" 
                      style={{ 
                        width: 48, 
                        height: 48, 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <Box sx={{ ml: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
                      预览图标
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={onClose}
            disabled={saving}
          >
            取消
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={saving || uploading}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            {saving ? '保存中...' : '保存'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
