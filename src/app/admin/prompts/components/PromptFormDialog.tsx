import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  SelectChangeEvent,
} from '@mui/material';

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

interface Props {
  open: boolean;
  onClose: (refresh?: boolean) => void;
  prompt: Prompt | null;
}

const defaultPrompt = {
  title: '',
  description: '',
  prompt: '',
  enTitle: '',
  enDescription: '',
  enPrompt: '',
  source: 99,
  tags: [],
  enTags: [],
};

export default function PromptFormDialog({ open, onClose, prompt }: Props) {
  const [formData, setFormData] = useState<Omit<Prompt, '_id'>>(defaultPrompt);
  const [tagInput, setTagInput] = useState('');
  const [enTagInput, setEnTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      setFormData(prompt);
    } else {
      setFormData(defaultPrompt);
    }
  }, [prompt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleAddTag = (type: 'tags' | 'enTags') => {
    const input = type === 'tags' ? tagInput : enTagInput;
    if (input.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], input.trim()],
      }));
      if (type === 'tags') {
        setTagInput('');
      } else {
        setEnTagInput('');
      }
    }
  };

  const handleDeleteTag = (type: 'tags' | 'enTags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    type: 'tags' | 'enTags'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(type);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = prompt ? `/api/prompts/${prompt._id}` : '/api/prompts';
      const method = prompt ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose(true);
      } else {
        const data = await response.json();
        console.error('Failed to save prompt:', data.message);
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>
        {prompt ? '编辑提示词' : '添加提示词'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            name="title"
            label="标题"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="description"
            label="描述"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            required
          />
          <TextField
            name="prompt"
            label="提示词"
            value={formData.prompt}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />

          <TextField
            name="enTitle"
            label="英文标题"
            value={formData.enTitle}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="enDescription"
            label="英文描述"
            value={formData.enDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            required
          />
          <TextField
            name="enPrompt"
            label="英文提示词"
            value={formData.enPrompt}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />

          <FormControl fullWidth>
            <InputLabel>来源</InputLabel>
            <Select
              name="source"
              value={formData.source}
              onChange={handleChange}
              label="来源"
            >
              <MenuItem value={0}>官方</MenuItem>
              <MenuItem value={1}>用户</MenuItem>
              <MenuItem value={99}>其他</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Box sx={{ mb: 1 }}>
              <TextField
                label="标签"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'tags')}
                size="small"
              />
              <Button
                onClick={() => handleAddTag('tags')}
                variant="text"
                sx={{ ml: 1 }}
              >
                添加
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag('tags', index)}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Box sx={{ mb: 1 }}>
              <TextField
                label="英文标签"
                value={enTagInput}
                onChange={(e) => setEnTagInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'enTags')}
                size="small"
              />
              <Button
                onClick={() => handleAddTag('enTags')}
                variant="text"
                sx={{ ml: 1 }}
              >
                添加
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.enTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag('enTags', index)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>取消</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}
