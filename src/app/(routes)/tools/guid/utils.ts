import { v4 as uuidv4 } from 'uuid';
import type { GUIDOptions } from './types';

export const generateGUID = (options: GUIDOptions): string => {
  let guid = uuidv4();

  if (options.uppercase) {
    guid = guid.toUpperCase();
  }

  switch (options.format) {
    case 'N': // 32位数字
      return guid.replace(/-/g, '');
    case 'B': // 带大括号
      return `{${guid}}`;
    case 'P': // 带圆括号
      return `(${guid})`;
    case 'D': // 标准格式（带连字符）
    default:
      return guid;
  }
};

export const isValidGUID = (guid: string): boolean => {
  // 支持所有格式的 GUID 验证
  const patterns = {
    N: /^[0-9a-f]{32}$/i,
    D: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    B: /^\{[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\}$/i,
    P: /^\([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\)$/i,
  };

  return Object.values(patterns).some(pattern => pattern.test(guid));
}; 