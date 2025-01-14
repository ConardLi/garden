"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  ChevronLeft as ChevronLeftIcon,
  SmartToy as SmartToyIcon,
  Camera as CameraIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  { title: "仪表盘", path: "/admin", icon: <DashboardIcon /> },
  { title: "网站管理", path: "/admin/websites", icon: <LanguageIcon /> },
  { title: "AI 工具", path: "/admin/aisites", icon: <SmartToyIcon /> },
  { title: "提示词管理", path: "/admin/prompts", icon: <CameraIcon /> },
  { title: "用户管理", path: "/admin/users", icon: <LanguageIcon /> },
  { title: "登录管理", path: "/admin/qrcode-sessions", icon: <LanguageIcon /> },
  { title: "系统设置", path: "/admin/settings", icon: <SettingsIcon /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="primary">
            Next Web Tools 管理后台
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : theme.spacing(7),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : theme.spacing(7),
            boxSizing: "border-box",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "hidden" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleMenuClick(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.12)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color:
                        pathname === item.path ? "primary.main" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        pathname === item.path ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pl: 2,
          width: `calc(100% - ${open ? drawerWidth : theme.spacing(7)}px)`,
          marginLeft: "20px",
          transition: theme.transitions.create(["width", "margin-left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
