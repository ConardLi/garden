import { FC } from 'react';
import { Stack, Typography, Grid, Paper, Button } from '@mui/material';
import type { GeneratedFavicon } from '../utils';
import DownloadIcon from '@mui/icons-material/Download';

interface IconPreviewProps {
  favicons: GeneratedFavicon[];
  onDownload: (favicon: GeneratedFavicon) => void;
  onDownloadAll: () => void;
}

const IconPreview: FC<IconPreviewProps> = ({ favicons, onDownload, onDownloadAll }) => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="medium">
          预览
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onDownloadAll}
        >
          下载全部尺寸
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {favicons.map((favicon) => (
          <Grid item xs={6} sm={4} md={3} key={favicon.size}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <img
                src={favicon.url}
                alt={favicon.size === 0 ? 'ICO 格式' : `${favicon.size}x${favicon.size}`}
                style={{
                  width: favicon.size === 0 ? 32 : Math.min(favicon.size, 128),
                  height: favicon.size === 0 ? 32 : Math.min(favicon.size, 128),
                  objectFit: 'contain',
                }}
              />
              <Stack spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {favicon.size === 0 ? 'ICO 格式 (多尺寸)' : `${favicon.size} x ${favicon.size}`}
                </Typography>
                <Button
                  size="small"
                  onClick={() => onDownload(favicon)}
                  startIcon={<DownloadIcon />}
                >
                  下载{favicon.size === 0 ? ' ICO' : ''}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default IconPreview; 