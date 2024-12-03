export const getToolPath = (toolId: string): string => {
  // 开发环境下使用 webpack dev server 的路由
  if (process.env.NODE_ENV === 'development') {
    return `/tools/${toolId}`;
  }
  // 生产环境下使用实际的 HTML 文件路径
  return `/tools/${toolId}/index.html`;
};

export const getHomePath = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  return '/index.html';
}; 