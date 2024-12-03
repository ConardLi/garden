'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import AICard from '@/components/workspace/AICard';
import TagFilter from '@/components/workspace/TagFilter';
import VirtualGrid from '@/components/workspace/VirtualGrid';
import { getFavoriteWebsites, toggleFavoriteWebsite } from '@/utils/storage';
import { WEBSITE_TYPES, TYPE_TO_ICON, TYPE_TO_LABEL, WebsiteType } from '@/constants/websites';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1600px',
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const GridContainer = styled(Box)({
  flex: 1,
  minHeight: 0, 
  overflowY: 'auto',
  msOverflowStyle: 'none',  // IE and Edge
  scrollbarWidth: 'none',   // Firefox
  '&::-webkit-scrollbar': { // Chrome, Safari, Opera
    display: 'none',
  },
});

const LoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '20px',
  '& .MuiCircularProgress-root': {
    color: 'rgba(255, 255, 255, 0.3)',
  }
});

interface Website {
  _id: string;
  title: string;
  url: string;
  icon: string;
  type: WebsiteType;
  iconType: string;
  iconValue?: string;
  description?: string;
  tags: string[];
}

interface ApiResponse {
  websites: Website[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface WorkspaceWebsitesProps {
  activeTag?: WebsiteType;
  onTagChange: (tag: WebsiteType) => void;
  searchText?: string;
}

const LIMIT = 40;

const WorkspaceWebsites: React.FC<WorkspaceWebsitesProps> = React.memo(({
  activeTag = 'app',
  onTagChange,
  searchText = '',
}) => {
  const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>([]);
  const [websites, setWebsites] = React.useState<Website[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    setFavoriteWebsites(getFavoriteWebsites());
  }, []);

  const fetchWebsites = React.useCallback(async (page: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: LIMIT.toString(),
    });

    if (activeTag && activeTag !== '全部') {
      params.set('type', activeTag);
    }
    
    if (searchText) {
      params.set('search', searchText);
    }

    const response = await fetch(`/api/websites?${params}`);
    const data: ApiResponse = await response.json();
    return data;
  }, [activeTag, searchText]);

  // 加载第一页数据
  React.useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setHasMore(true); // 重置hasMore状态
      try {
        const data = await fetchWebsites(1);
        setWebsites(data.websites);
        setCurrentPage(1);
        setTotalPages(data.pagination.pages);
        setHasMore(data.websites.length === LIMIT); // 根据返回数据判断是否还有更多
      } catch (error) {
        console.error('Failed to fetch websites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fetchWebsites]);

  // 加载更多数据
  const loadMore = React.useCallback(async () => {
    if (isLoadingMore || !hasMore) {
      console.log('Skipping loadMore:', { isLoadingMore, hasMore, currentPage });
      return;
    }

    console.log('Loading more...', { currentPage });
    setIsLoadingMore(true);
    try {
      const data = await fetchWebsites(currentPage + 1);
      console.log('Loaded data:', { 
        dataLength: data.websites.length,
        total: data.pagination.total,
        page: data.pagination.page,
        pages: data.pagination.pages
      });

      if (data.websites.length > 0) {
        setWebsites(prev => {
          const newWebsites = [...prev, ...data.websites];
          console.log('Updated websites:', { 
            prevLength: prev.length, 
            newLength: newWebsites.length 
          });
          return newWebsites;
        });
        setCurrentPage(prev => prev + 1);
        setHasMore(data.websites.length === LIMIT);
      } else {
        console.log('No more data');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more websites:', error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, isLoadingMore, hasMore, fetchWebsites]);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const shouldLoadMore = scrollHeight - scrollTop - clientHeight < 200 && !isLoadingMore && hasMore;
    
    console.log('Scroll check:', { 
      scrollTop,
      clientHeight,
      scrollHeight,
      distanceToBottom: scrollHeight - scrollTop - clientHeight,
      isLoadingMore,
      hasMore,
      shouldLoadMore
    });

    if (shouldLoadMore) {
      loadMore();
    }
  }, [loadMore, isLoadingMore, hasMore]);

  const handleWebsiteClick = React.useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavoriteToggle = React.useCallback((websiteTitle: string) => {
    const newFavorites = toggleFavoriteWebsite(websiteTitle);
    setFavoriteWebsites(newFavorites);
  }, []);

  const handleTagChange = React.useCallback((newTags: WebsiteType[]) => {
    const newTag = newTags.length > 0 ? newTags[0] : 'app';
    onTagChange(newTag);
  }, [onTagChange]);

  const renderItem = React.useCallback((website: Website, style: React.CSSProperties) => {
    return (
      <AICard
        key={website._id}
        website={{
          title: website.title,
          url: website.url,
          icon: website.icon,
          iconType: website.iconType,
          iconValue: website.iconValue,
          description: website.description || '',
          tags: [TYPE_TO_LABEL[website.type]],
        }}
        onClick={() => handleWebsiteClick(website.url)}
        onFavoriteToggle={() => handleFavoriteToggle(website.title)}
        favoriteWebsites={favoriteWebsites}
        style={style}
      />
    );
  }, [handleWebsiteClick, handleFavoriteToggle, favoriteWebsites]);

  const TagFilterMemo = React.useMemo(() => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      mb: 4,
      px: { xs: 2, sm: 4, md: 6 }, 
      maxWidth: '100%',
      overflow: 'auto',
    }}>
      <TagFilter<WebsiteType>
        tags={WEBSITE_TYPES}
        selectedTags={[activeTag]}
        tagToIcon={TYPE_TO_ICON}
        tagToLabel={TYPE_TO_LABEL}
        onTagChange={handleTagChange}
        singleSelect
      />
    </Box>
  ), [activeTag, handleTagChange]);

  return (
    <ContentSection>
      {TagFilterMemo}
      <GridContainer onScroll={handleScroll}>
        {isLoading ? (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        ) : (
          <>
            <VirtualGrid
              items={websites}
              itemHeight={100}
              minItemWidth={300}
              gap={16}
              renderItem={renderItem}
            />
            {isLoadingMore && (
              <LoadingWrapper>
                <CircularProgress />
              </LoadingWrapper>
            )}
          </>
        )}
      </GridContainer>
    </ContentSection>
  );
});

WorkspaceWebsites.displayName = 'WorkspaceWebsites';

export default WorkspaceWebsites;
