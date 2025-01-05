'use client';

import { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, Avatar, Menu, MenuItem, Snackbar } from '@mui/material';
import LoginDialog from '@/components/LoginDialog';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.grey[800],
    minWidth: 'unset',
    padding: '6px 16px',
  }
}));

export interface UserInfo {
  nickname: string;
  avatarUrl: string;
}

export function UserAvatar() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 处理登录成功
  const handleLoginSuccess = useCallback((token: string, info: any) => {
    // 保存 token 到 localStorage
    localStorage.setItem('token', token);
    // 保存用户信息到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(info));
    // 保存用户信息到状态
    setUserInfo(info);
  }, []);

  // 处理登出
  const handleLogout = useCallback(() => {
    // 清除 localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // 清除状态
    setUserInfo(null);
    // 关闭菜单
    setAnchorEl(null);
    // 显示退出成功提示
    setSnackbarOpen(true);
  }, []);

  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserInfo = localStorage.getItem('userInfo');
    
    if (token && savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo));
      } catch (error) {
        console.error('Failed to parse user info:', error);
      }
    }
  }, []);

  return (
    <>
      <Tooltip title={userInfo ? userInfo.nickname : '登录'} placement="right" arrow>
        <StyledAvatar
          src={userInfo?.avatarUrl}
          onClick={(event) => {
            if (userInfo) {
              setAnchorEl(event.currentTarget);
            } else {
              setLoginDialogOpen(true);
            }
          }}
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>退出登录</MenuItem>
      </Menu>

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <StyledSnackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="已退出登录"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
} 