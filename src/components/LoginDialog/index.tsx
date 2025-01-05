'use client';

import { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  CircularProgress,
  Fade,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import { QRCodeSVG } from 'qrcode.react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, userInfo: any) => void;
}

const LoginDialog: FC<LoginDialogProps> = ({ open, onClose, onLoginSuccess }) => {
  const [qrcodeId, setQrcodeId] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'expired' | 'success'>('loading');
  const [polling, setPolling] = useState<NodeJS.Timeout | null>(null);

  // 生成二维码
  const generateQRCode = async () => {
    try {
      const response = await fetch('/api/auth/qrcode', {
        method: 'POST',
      });
      const data = await response.json();
      setQrcodeId(data.qrcodeId);
      setStatus('ready');
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  // 检查登录状态
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`/api/auth/login/status?qrcodeId=${qrcodeId}`);
      const data = await response.json();

      if (data.status === 'expired') {
        setStatus('expired');
        if (polling) {
          clearInterval(polling);
          setPolling(null);
        }
      } else if (data.status === 'success') {
        if (polling) {
          clearInterval(polling);
          setPolling(null);
        }
        setStatus('success');
        // 延迟关闭弹窗，让用户看到成功状态
        setTimeout(() => {
          onLoginSuccess(data.token, data.userInfo);
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to check login status:', error);
    }
  };

  // 清理轮询
  const clearPollingInterval = () => {
    if (polling) {
      clearInterval(polling);
      setPolling(null);
    }
  };

  // 组件挂载或 open 状态变化时的处理
  useEffect(() => {
    if (open) {
      generateQRCode();
    } else {
      // 弹窗关闭时，清理状态和轮询
      clearPollingInterval();
      setQrcodeId('');
      setStatus('loading');
    }
  }, [open]);

  // 开始轮询状态
  useEffect(() => {
    if (qrcodeId && status === 'ready' && open) {
      const interval = setInterval(checkLoginStatus, 2000);
      setPolling(interval);
      return () => clearInterval(interval);
    }
  }, [qrcodeId, status, open]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      clearPollingInterval();
    };
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center">
          微信扫码登录
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            minHeight: 300,
            justifyContent: 'center',
          }}
        >
          {status === 'loading' && <CircularProgress />}
          
          {status === 'ready' && qrcodeId && (
            <>
              <QRCodeSVG
                value={qrcodeId}
                size={200}
                level="H"
                includeMargin
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                请使用微信扫描二维码登录
              </Typography>
            </>
          )}

          {status === 'success' && (
            <Fade in={true}>
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: 60,
                    color: green[500],
                    mb: 2
                  }}
                />
                <Typography variant="h6" color={green[500]}>
                  授权登录成功
                </Typography>
              </Box>
            </Fade>
          )}

          {status === 'expired' && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography color="error" gutterBottom>
                二维码已过期
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setStatus('loading');
                  generateQRCode();
                }}
              >
                点击刷新
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog; 