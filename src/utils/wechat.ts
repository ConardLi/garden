import { readFileSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';

// 读取配置文件
const secret = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/secret.json'), 'utf-8')
);

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

interface QRCodeResponse {
  ticket: string;
  expire_seconds: number;
  url: string;
}

let accessToken: string | null = null;
let tokenExpireTime: number | null = null;

export async function getAccessToken(): Promise<string> {
  // 如果token存在且未过期，直接返回
  if (accessToken && tokenExpireTime && Date.now() < tokenExpireTime) {
    return accessToken;
  }

  // 获取新token
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${secret.wxAppId}&secret=${secret.wxAppSecret}`;
  const response = await fetch(url);
  const data: AccessTokenResponse = await response.json();

  if (!data.access_token) {
    throw new Error('Failed to get access token');
  }

  accessToken = data.access_token;
  tokenExpireTime = Date.now() + (data.expires_in - 300) * 1000; // 提前5分钟过期
  return accessToken;
}

export async function createTempQRCode(sceneStr: string): Promise<QRCodeResponse> {
  const token = await getAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${token}`;
  
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      expire_seconds: 300, // 5分钟过期
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: sceneStr
        }
      }
    })
  });

  const data: QRCodeResponse = await response.json();
  if (!data.ticket) {
    throw new Error('Failed to create QR code');
  }

  return data;
}

export function verifySignature(signature: string, timestamp: string, nonce: string): boolean {
  try {
    console.log('Verifying signature with params:', { signature, timestamp, nonce, token: secret.token });
    const arr = [secret.token, timestamp, nonce];
    arr.sort();
    const str = arr.join('');
    console.log('Sorted and joined string:', str);
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    const calculatedSignature = sha1.digest('hex');
    console.log('Calculated signature:', calculatedSignature);
    console.log('Matches:', calculatedSignature === signature);
    return calculatedSignature === signature;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

// 用于存储登录会话
export const loginSessions = new Map<string, {
  status: 'pending' | 'scanned' | 'confirmed' | 'expired';
  openid?: string;
  createTime: number;
}>();


