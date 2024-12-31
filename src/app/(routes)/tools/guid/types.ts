// GUID 格式
// N: 32位数字
// D: 32位数字带连字符（标准格式）
// B: 带大括号
// P: 带圆括号
export type GUIDFormat = "N" | "D" | "B" | "P";

export interface GUIDOptions {
  format: GUIDFormat;
  uppercase: boolean;
  count: number;
} 