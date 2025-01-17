"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Snackbar, Alert } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import WorkspaceNav from "@/components/workspace/WorkspaceNav";

const WorkspaceContainer = styled(Box)({
  width: "100vw",
  minHeight: "100vh",
  position: "relative",
  backgroundColor: "#1a1a1a",
});

// 获取保存的壁纸 URL
const getSavedWallpaper = () => {
  if (typeof window === "undefined" || !localStorage) return undefined;
  const savedWallpaper = localStorage.getItem("workspace-wallpaper");
  return savedWallpaper ? `url(${savedWallpaper})` : undefined;
};

const BackgroundImage = styled(Box)<{ bgImage?: string }>(({ bgImage }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage:
    bgImage ||
    localStorage.getItem("workspace-wallpaper") ||
    "url(/imgs/th.jpeg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.9)",
  zIndex: 0,
}));

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
  const activeTab = pathname.split("/").pop() || "home";
  const [wallpaperUrl, setWallpaperUrl] = useState(getSavedWallpaper);
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
    // 只监听壁纸变更事件，不再需要从 localStorage 读取
    const handleWallpaperChange = (event: CustomEvent<string>) => {
      setWallpaperUrl(event.detail ? `url(${event.detail})` : undefined);
    };

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

    window.addEventListener(
      "wallpaper-changed",
      handleWallpaperChange as EventListener
    );
    window.addEventListener("show-toast", handleShowToast as EventListener);

    return () => {
      window.removeEventListener(
        "wallpaper-changed",
        handleWallpaperChange as EventListener
      );
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

  return (
    <WorkspaceContainer>
      <BackgroundImage bgImage={wallpaperUrl} />
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
  );
};

export default Workspace;
