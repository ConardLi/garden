export interface SearchEngine {
  key: string;
  name: string;
  icon: string;
  searchUrl: string;
  placeholder?: string;
}

export const SEARCH_ENGINES: SearchEngine[] = [
  {
    key: 'google',
    name: 'Google',
    icon: 'google',
    searchUrl: 'https://www.google.com/search?q={query}',
  },
  {
    key: 'baidu',
    name: '百度',
    icon: 'baidu',
    searchUrl: 'https://www.baidu.com/s?wd={query}',
  },
  {
    key: 'bing',
    name: 'Bing',
    icon: 'bing',
    searchUrl: 'https://www.bing.com/search?q={query}',
  },
  {
    key: 'github',
    name: 'GitHub',
    icon: 'github',
    searchUrl: 'https://github.com/search?q={query}&type=repositories',
    placeholder: '搜索开源项目...',
  },
  {
    key: 'mdn',
    name: 'MDN',
    icon: 'mdn',
    searchUrl: 'https://developer.mozilla.org/zh-CN/search?q={query}',
    placeholder: '搜索 Web 开发文档...',
  },
  {
    key: 'toutiao',
    name: '头条',
    icon: 'toutiao',
    searchUrl: 'https://so.toutiao.com/search?dvpf=pc&keyword={query}',
  },
  {
    key: 'xiaohongshu',
    name: '小红书',
    icon: 'xiaohongshu',
    searchUrl: 'https://www.xiaohongshu.com/search_result?m_source=itab&keyword={query}&type=51',
  },
  {
    key: 'zhihu',
    name: '知乎',
    icon: 'zhihu',
    searchUrl: 'https://www.zhihu.com/search?type=content&q={query}',
  },
  {
    key: 'douyin',
    name: '抖音',
    icon: 'douyin',
    searchUrl: 'https://www.douyin.com/search/{query}',
  },
  {
    key: 'bilibili',
    name: 'B站',
    icon: 'bilibili',
    searchUrl: 'https://search.bilibili.com/all?keyword={query}',
    placeholder: '搜索视频、番剧、UP主...',
  },
];

export const getSearchUrl = (engine: string, query: string): string => {
  const searchEngine = SEARCH_ENGINES.find(e => e.key === engine);
  if (!searchEngine) {
    throw new Error(`Unknown search engine: ${engine}`);
  }
  return searchEngine.searchUrl.replace('{query}', encodeURIComponent(query));
};

export const getSearchEngineName = (engine: string): string => {
  const searchEngine = SEARCH_ENGINES.find(e => e.key === engine);
  return searchEngine?.name || engine;
};
