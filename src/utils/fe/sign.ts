import md5 from 'crypto-js/md5';
import { apiSignKey } from '../../config/secret.json';

interface SignParams {
  timestamp: number;
  [key: string]: any;
}

/**
 * 生成请求签名
 * @param params 请求参数
 * @returns 签名结果
 */
export function generateSign(params: SignParams) {
  // 1. 提取并排序所有参数的key
  const keys = Object.keys(params).sort();
  
  // 2. 拼接参数字符串
  const signStr = keys
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // 3. 加上签名密钥
  const signStrWithKey = `${signStr}&key=${apiSignKey}`;
  
  // 4. 生成MD5
  return md5(signStrWithKey).toString();
}

/**
 * 为请求添加签名信息
 * @param params 原始参数
 * @returns 添加签名后的参数
 */
export function addSignToParams(params: Record<string, any> = {}) {
  const timestamp = Date.now();
  const paramsWithTimestamp = {
    ...params,
    timestamp,
  };
  
  const sign = generateSign(paramsWithTimestamp);
  
  return {
    ...paramsWithTimestamp,
    sign,
  };
}
