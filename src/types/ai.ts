export type AITagType = 
  | '全部'
  | '写作工具' 
  | '图像工具' 
  | '视频工具'
  | '办公工具'
  | '设计工具'
  | '编程工具'
  | '搜索引擎'
  | '音频工具'
  | '开发平台'
  | '训练模型'
  | '内容检测'
  | '语言翻译'
  | '法律助手'
  | '提示指令'
  | '模型评测'
  | '学习网站';

export interface AIWebsite {
  title: string;
  description: string;
  url: string;
  icon: string;
  iconType?:string;
  tags?: AITagType[];
}

export interface AIWebsiteGroup {
  [key: string]: AIWebsite[];
}
