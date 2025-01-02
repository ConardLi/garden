import { FC } from 'react';
import {
  Stack,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

interface UUIDHistoryProps {
  history: string[];
  onClear: () => void;
  uppercase: boolean;
}

const UUIDHistory: FC<UUIDHistoryProps> = ({
  history,
  onClear,
  uppercase,
}) => {
  const handleCopy = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(history.join('\n'));
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" fontWeight="medium">
          生成历史
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyAll}
          >
            复制全部
          </Button>
          <Button
            size="small"
            startIcon={<DeleteIcon />}
            onClick={onClear}
            color="error"
          >
            清空历史
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <List dense disablePadding>
          {history.map((uuid, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Tooltip title="复制">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleCopy(uuid)}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
              sx={{
                borderBottom: (theme) =>
                  index !== history.length - 1
                    ? `1px solid ${theme.palette.divider}`
                    : 'none',
              }}
            >
              <ListItemText
                primary={uuid}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: 'monospace',
                    fontSize: '14px',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default UUIDHistory; 