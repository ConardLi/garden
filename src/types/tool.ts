export type TagType = 
  | '图片工具'
  | '文本工具'
  | '文件工具'
  | '视频工具'
  | '网络工具'
  | '转换工具'
  | '开发工具'
  | '设计工具'
  | '生活工具'
  | '编码加密'
;

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: TagType[];
}