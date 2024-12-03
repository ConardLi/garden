export type WebsiteTagType = 
  | '搜索引擎'
  | '社交媒体'
  | '新闻资讯'
  | '工具网站'
  | '学习教育'
  | '娱乐休闲'
  | '购物网站'
  | 'AI工具'
;

export interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  tags: WebsiteTagType[];
}
