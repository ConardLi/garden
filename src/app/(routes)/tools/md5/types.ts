export interface MD5Options {
  uppercase: boolean;      // 是否大写
  salt: string;           // 加盐值
  saltPosition: 'append' | 'prepend' | 'both';  // 加盐位置
  iterations: number;     // 迭代次数
}

export interface MD5History {
  input: string;
  result: string;
  timestamp: number;
  options: MD5Options;
} 