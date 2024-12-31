import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import type { UUIDOptions } from './types';

// 预定义的命名空间
export const UUID_NAMESPACES = {
  DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
} as const;

export const generateUUID = (options: UUIDOptions): string => {
  let uuid = '';
  
  switch (options.version) {
    case 'v1':
      uuid = uuidv1();
      break;
    case 'v5':
      // 如果没有提供命名空间或名称，使用 URL 命名空间和当前时间戳作为默认值
      const namespace = options.namespace || UUID_NAMESPACES.URL;
      const name = options.name || new Date().toISOString();
      uuid = uuidv5(name, namespace);
      break;
    case 'v4':
    default:
      uuid = uuidv4();
  }

  if (options.removeDashes) {
    uuid = uuid.replace(/-/g, '');
  }

  if (options.uppercase) {
    uuid = uuid.toUpperCase();
  }

  return uuid;
};

export const isValidUUID = (uuid: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

export const isValidNamespace = (namespace: string): boolean => {
  return isValidUUID(namespace);
}; 