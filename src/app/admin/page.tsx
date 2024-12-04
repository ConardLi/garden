'use client';

import { Box, Typography, Grid, Paper } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
        仪表盘
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <LanguageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              网站管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              管理和维护您的网站列表
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
