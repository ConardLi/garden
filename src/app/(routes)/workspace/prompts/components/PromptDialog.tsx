import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Chip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Prompt } from '../types';

interface PromptDialogProps {
  promptId: string | null;
  onClose: () => void;
}

type Language = 'zh' | 'en';

const PromptDialog: React.FC<PromptDialogProps> = React.memo(({ promptId, onClose }) => {
  const [prompt, setPrompt] = React.useState<Prompt | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [language, setLanguage] = React.useState<Language>('zh');
  const [copySuccess, setCopySuccess] = React.useState(false);

  React.useEffect(() => {
    const fetchPromptDetails = async () => {
      if (!promptId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/prompts/${promptId}`);
        if (!response.ok) throw new Error("获取提示词详情失败");
        const data = await response.json();
        console.log('Prompt data:', data); // 添加调试日志
        setPrompt(data);
      } catch (error) {
        console.error("获取提示词详情失败:", error);
        setError("获取提示词详情失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchPromptDetails();
  }, [promptId]);

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: Language | null,
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  const handleCopy = async () => {
    if (!prompt) return;
    
    const textToCopy = language === 'zh' ? prompt.prompt : prompt.enPrompt;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getTitle = () => {
    if (loading) return "加载中...";
    if (!prompt) return "";
    return language === 'zh' ? prompt.title : prompt.enTitle;
  };

  const getDescription = () => {
    if (!prompt) return "";
    return language === 'zh' ? prompt.description : prompt.enDescription;
  };

  const getPromptText = () => {
    if (!prompt) return "";
    return language === 'zh' ? prompt.prompt : prompt.enPrompt;
  };

  const getTags = () => {
    if (!prompt) return [];
    const tags = language === 'zh' ? prompt.tags : prompt.enTags;
    console.log('Current tags:', tags); // 添加调试日志
    return tags;
  };

  if (!promptId) return null;

  return (
    <>
      <Dialog 
        open={!!promptId} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '60vh',
            maxHeight: '80vh',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: 1 }}>{getTitle()}</Box>
          {!loading && prompt && (
            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleLanguageChange}
              size="small"
            >
              <ToggleButton value="zh">中文</ToggleButton>
              <ToggleButton value="en">English</ToggleButton>
            </ToggleButtonGroup>
          )}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ p: 2 }}>
              {error}
            </Typography>
          ) : prompt ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {getDescription()}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {getTags().map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#e0e0e0',
                      color: '#666',
                      '&:hover': {
                        borderColor: '#999',
                        color: '#333',
                      },
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  提示词内容：
                </Typography>
                <Tooltip title="复制到剪贴板">
                  <IconButton onClick={handleCopy} size="small">
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  padding: 2,
                  borderRadius: 1,
                  overflow: "auto",
                  maxHeight: "400px",
                  fontFamily: 'monospace',
                }}
              >
                {getPromptText()}
              </Typography>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>关闭</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="已复制到剪贴板"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
});

PromptDialog.displayName = 'PromptDialog';

export default PromptDialog;
