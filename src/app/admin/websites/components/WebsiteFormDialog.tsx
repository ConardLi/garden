'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Save as SaveIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface WebsiteFormData {
  title: string;
  description: string;
  type: string;
  url: string;
  icon?: string;
}

interface WebsiteFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WebsiteFormData) => Promise<void>;
  initialData?: WebsiteFormData;
  title: string;
  websiteTypes: string[];
}

const defaultFormData: WebsiteFormData = {
  title: '',
  description: '',
  type: '',
  url: '',
};

export default function WebsiteFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  title: dialogTitle,
  websiteTypes,
}: WebsiteFormDialogProps) {
  const [formData, setFormData] = useState<WebsiteFormData>(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreviewUrl(initialData.icon || '');
    } else {
      setFormData(defaultFormData);
      setPreviewUrl('');
    }
  }, [initialData, open]);

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
      <DialogTitle sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        {dialogTitle}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="title"
              label="标题"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="描述"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel>类型</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="类型"
              >
                {websiteTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="url"
              label="URL"
              value={formData.url}
              onChange={handleChange}
              required
              fullWidth
              type="url"
            />
            {!initialData && (
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
