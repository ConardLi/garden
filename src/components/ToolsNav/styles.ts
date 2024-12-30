import { SxProps, Theme } from '@mui/material';

export const DRAWER_WIDTH = 210;

// 基础导航项样式
const baseNavItemStyles: SxProps<Theme> = {
  borderRadius: 1,
  '&.Mui-selected': {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      bgcolor: 'primary.dark',
    }
  }
};

// 一级导航项样式（包括"全部工具"和标签组）
export const primaryNavItemStyles: SxProps<Theme> = {
  ...baseNavItemStyles,
  py: 1,
  px: 2,
  '&:hover': {
    bgcolor: 'action.hover',
  }
};

// 二级导航项样式（工具列表项）
export const secondaryNavItemStyles: SxProps<Theme> = {
  ...baseNavItemStyles,
  mx: 1,
  pl: 4
};

export const navGroupStyles = primaryNavItemStyles; 