"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Snackbar, Alert } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Script from 'next/script';
import WorkspaceNav from "@/components/workspace/WorkspaceNav";
import { storage } from "@/utils/fe/storage";

const WorkspaceContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  position: "relative",
  backgroundColor: "#1a1a1a",
});

// 内联脚本：在页面加载前检查和设置壁纸
const INLINE_SCRIPT = `
  (function() {
    try {
      var savedWallpaper = localStorage.getItem('workspace-wallpaper');
      if (savedWallpaper) {
        document.documentElement.style.setProperty('--wallpaper', 'url(' + savedWallpaper + ')');
      } else {
        document.documentElement.style.setProperty('--wallpaper', 'url(/imgs/th.jpeg)');
      }
      // 延迟一帧添加过渡类，确保初始壁纸已加载
      requestAnimationFrame(() => {
        document.documentElement.classList.add('wallpaper-loaded');
      });
    } catch (e) {
      console.error('Failed to load wallpaper:', e);
    }
  })();
`;

// 添加全局样式
const INLINE_STYLE = `
  :root {
    --wallpaper: none;
  }
  .wallpaper-loaded .workspace-bg {
    opacity: 1;
  }
`;

const BackgroundImage = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: "var(--wallpaper)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.9)",
  zIndex: 0,
  opacity: 0,
  transition: "opacity 0.3s ease-in-out, background-image 0.3s ease-in-out",
});

const BackgroundOverlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 1,
});

const ContentWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  zIndex: 2,
});

const Workspace: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [wallpaperUrl, setWallpaperUrl] = useState<string | undefined>(undefined);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const savedWallpaper = storage.getItem("workspace-wallpaper");
    if (savedWallpaper) {
      setWallpaperUrl(`url(${savedWallpaper})`);
    } else {
      setWallpaperUrl("url(/imgs/th.jpeg)");
    }
    setHasCheckedStorage(true);
  }, []);

  useEffect(() => {
    // 监听壁纸变更
    const handleWallpaperChange = (event: CustomEvent<string>) => {
      if (event.detail) {
        document.documentElement.style.setProperty('--wallpaper', `url(${event.detail})`);
        // 同时更新 localStorage
        storage.setItem('workspace-wallpaper', event.detail);
      }
    };

    window.addEventListener(
      "wallpaper-changed",
      handleWallpaperChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "wallpaper-changed",
        handleWallpaperChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    // 监听 Toast 显示事件
    const handleShowToast = (
      event: CustomEvent<{ message: string; type: "success" | "error" }>
    ) => {
      setToast({
        open: true,
        message: event.detail.message,
        type: event.detail.type,
      });
    };

    window.addEventListener("show-toast", handleShowToast as EventListener);

    return () => {
      window.removeEventListener(
        "show-toast",
        handleShowToast as EventListener
      );
    };
  }, []);

  const handleTabChange = (newTab: string) => {
    router.push(`/workspace/${newTab}`);
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const activeTab = pathname.split("/").pop() || "home";

  return (
    <>
      <Script id="load-wallpaper" dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} strategy="beforeInteractive" />
      <style dangerouslySetInnerHTML={{ __html: INLINE_STYLE }} />
      <WorkspaceContainer>
        <BackgroundImage className="workspace-bg" />
        <BackgroundOverlay />
        <ContentWrapper>
          <WorkspaceNav activeTab={activeTab} onTabChange={handleTabChange} />
          {children}
        </ContentWrapper>
        <Snackbar
          open={toast.open}
          autoHideDuration={2000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseToast}
            severity={toast.type}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </WorkspaceContainer>
    </>
  );
};

export default Workspace;
