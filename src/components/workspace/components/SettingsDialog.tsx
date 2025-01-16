import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CircularProgress,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { get } from "@/utils/fe/request";
import debounce from 'lodash/debounce';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface WallpaperData {
  _id: string;
  fullSrc: string;
  copyright: string;
  enddate: string;
  thumb: string;
}

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallpapers, setWallpapers] = useState<WallpaperData[]>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  const fetchWallpapers = async (search?: string, currentPage: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: currentPage,
        pageSize,
        keyword: search ?? keyword,
      };
      const response = await get("/api/wallpapers", params);
      if (response.code === 200) {
        setWallpapers(response.data.list);
        setTotal(response.data.pagination.total);
      } else {
        setError(response.msg || "获取壁纸失败");
      }
    } catch (err: any) {
      setError(err.message || "获取壁纸失败");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce((search: string) => {
      setPage(1); // 搜索时重置页码
      fetchWallpapers(search, 1);
    }, 300),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    debouncedFetch(value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchWallpapers(undefined, value);
  };

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValue(newValue);
    if (newValue === 0) {
      await fetchWallpapers();
    }
  };

  const handleSelectWallpaper = (wallpaperUrl: string) => {
    // 确保 URL 是完整的
    const fullUrl = wallpaperUrl.startsWith('http') || wallpaperUrl.startsWith('/') 
      ? wallpaperUrl 
      : `/${wallpaperUrl}`;
    
    localStorage.setItem("workspace-wallpaper", fullUrl);
    window.dispatchEvent(
      new CustomEvent("wallpaper-changed", { detail: fullUrl })
    );
    
    onClose();
    // 在对话框关闭后显示提示
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("show-toast", { 
          detail: { message: "壁纸切换成功", type: "success" } 
        })
      );
    }, 300);
  };

  // 打开弹窗时获取壁纸列表
  React.useEffect(() => {
    if (open && tabValue === 0) {
      setPage(1);
      setKeyword('');
      fetchWallpapers('', 1);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>工作区设置</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="壁纸设置" />
            <Tab label="其他设置" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2, mt: 2 }}>
            <TextField
              fullWidth
              placeholder="搜索壁纸..."
              value={keyword}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {error ? (
            <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>
              {error}
            </Box>
          ) : loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <ImageList cols={3} gap={8}>
                {wallpapers.map((wallpaper) => (
                  <ImageListItem
                    key={wallpaper._id}
                    onClick={() => handleSelectWallpaper(wallpaper.fullSrc)}
                    sx={{ cursor: "pointer" }}
                  >
                    <img
                      src={wallpaper.thumb}
                      alt={wallpaper.copyright}
                      loading="lazy"
                      style={{ borderRadius: "4px" }}
                    />
                    <ImageListItemBar
                      title={wallpaper.copyright}
                      subtitle={wallpaper.enddate}
                      sx={{
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              
              {total > pageSize && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={Math.ceil(total / pageSize)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          其他设置内容
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
