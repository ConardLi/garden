const STORAGE_KEYS = {
  SEARCH_ENGINE: 'preferred_search_engine',
  FAVORITE_TOOLS: 'favorite_tools',
  FAVORITE_WEBSITES: 'favorite_websites',
  FAVORITE_AI_WEBSITES: 'favorite_ai_websites',
  FAVORITE_PROMPTS: 'favorite_prompts',
} as const;

// 默认收藏的工具
const DEFAULT_FAVORITE_TOOLS = ['json-formatter', 'color-palette', 'image-converter'];

// 默认收藏的网站
const DEFAULT_FAVORITE_WEBSITES = ['google', 'github', 'chatgpt'];

// 默认收藏的 AI 网站
const DEFAULT_FAVORITE_AI_WEBSITES: string[] = [];

// 检查是否在客户端环境
const isClient = typeof window !== 'undefined';

// 安全的获取 localStorage
const getLocalStorage = () => {
  if (isClient) {
    return window.localStorage;
  }
  return null;
};

export const getStoredSearchEngine = (): string | null => {
  const storage = getLocalStorage();
  return storage?.getItem(STORAGE_KEYS.SEARCH_ENGINE) || null;
};

export const setStoredSearchEngine = (engine: string): void => {
  const storage = getLocalStorage();
  storage?.setItem(STORAGE_KEYS.SEARCH_ENGINE, engine);
};

// 工具收藏相关函数
export const getFavoriteTools = (): string[] => {
  const storage = getLocalStorage();
  if (!storage) return DEFAULT_FAVORITE_TOOLS;
  
  const stored = storage.getItem(STORAGE_KEYS.FAVORITE_TOOLS);
  if (!stored) {
    setFavoriteTools(DEFAULT_FAVORITE_TOOLS);
    return DEFAULT_FAVORITE_TOOLS;
  }
  return JSON.parse(stored);
};

export const setFavoriteTools = (tools: string[]): void => {
  const storage = getLocalStorage();
  storage?.setItem(STORAGE_KEYS.FAVORITE_TOOLS, JSON.stringify(tools));
};

export const toggleFavoriteTool = (toolId: string): string[] => {
  const favorites = getFavoriteTools();
  const index = favorites.indexOf(toolId);
  
  if (index === -1) {
    favorites.push(toolId);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteTools(favorites);
  return favorites;
};

export const isFavoriteTool = (toolId: string): boolean => {
  const favorites = getFavoriteTools();
  return favorites.includes(toolId);
};

// 网站收藏相关函数
export const getFavoriteWebsites = (): string[] => {
  const storage = getLocalStorage();
  if (!storage) return DEFAULT_FAVORITE_WEBSITES;

  const stored = storage.getItem(STORAGE_KEYS.FAVORITE_WEBSITES);
  if (!stored) {
    setFavoriteWebsites(DEFAULT_FAVORITE_WEBSITES);
    return DEFAULT_FAVORITE_WEBSITES;
  }
  return JSON.parse(stored);
};

export const setFavoriteWebsites = (websites: string[]): void => {
  const storage = getLocalStorage();
  storage?.setItem(STORAGE_KEYS.FAVORITE_WEBSITES, JSON.stringify(websites));
};

export const toggleFavoriteWebsite = (websiteId: string): string[] => {
  const favorites = getFavoriteWebsites();
  const index = favorites.indexOf(websiteId);

  if (index === -1) {
    favorites.push(websiteId);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteWebsites(favorites);
  return favorites;
};

export const isFavoriteWebsite = (websiteId: string): boolean => {
  const favorites = getFavoriteWebsites();
  return favorites.includes(websiteId);
};

// AI 网站收藏相关函数
export const getFavoriteAIWebsites = (): string[] => {
  const storage = getLocalStorage();
  if (!storage) return DEFAULT_FAVORITE_AI_WEBSITES;

  const stored = storage.getItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES);
  if (!stored) {
    setFavoriteAIWebsites(DEFAULT_FAVORITE_AI_WEBSITES);
    return DEFAULT_FAVORITE_AI_WEBSITES;
  }
  return JSON.parse(stored);
};

export const setFavoriteAIWebsites = (websites: string[]): void => {
  const storage = getLocalStorage();
  console.log(555,websites);
  const res = storage?.setItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES, JSON.stringify(websites));
  console.log(222,storage,res);
  console.log(333,storage);
  console.log(444,storage.getItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES));
};

export const toggleFavoriteAIWebsite = (websiteTitle: string): string[] => {
  const favorites = getFavoriteAIWebsites();
  const index = favorites.indexOf(websiteTitle);
  
  
  console.log(666,favorites);
  if (index === -1) {
    favorites.push(websiteTitle);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteAIWebsites(favorites);
  return favorites;
};

export const isFavoriteAIWebsite = (websiteTitle: string): boolean => {
  const favorites = getFavoriteAIWebsites();
  return favorites.includes(websiteTitle);
};

// Prompt favorites
const FAVORITE_PROMPTS_KEY = STORAGE_KEYS.FAVORITE_PROMPTS;

export const getFavoritePrompts = (): string[] => {
  if (typeof window === 'undefined') return [];
  const storage = getLocalStorage();
  const favorites = storage?.getItem(FAVORITE_PROMPTS_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavoritePrompt = (promptId: string): string[] => {
  const favorites = getFavoritePrompts();
  const index = favorites.indexOf(promptId);
  
  if (index === -1) {
    favorites.push(promptId);
  } else {
    favorites.splice(index, 1);
  }
  
  const storage = getLocalStorage();
  storage?.setItem(FAVORITE_PROMPTS_KEY, JSON.stringify(favorites));
  return favorites;
};
