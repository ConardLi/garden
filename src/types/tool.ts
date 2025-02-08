export type TagType =
  | "开发工具"
  | "图片工具"
  | "文本工具"
  | "生活工具"
  | "转换工具"
  | "文件工具"
  | "设计工具"
  | "视频工具"
  | "网络工具"
  | "编码加密"
  | "数据图表";

export interface Tool {
  id: string;
  name: string;
  description: string;
  detailDescription?: string;
  icon: string;
  tags: TagType[];
}
