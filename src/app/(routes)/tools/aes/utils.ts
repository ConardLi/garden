import CryptoJS from 'crypto-js';
import type { AESOptions } from './types';

const validateKey = (key: string, keySize: number): string => {
  // 检查密钥长度是否符合要求
  const requiredLength = keySize / 8;
  if (key.length < requiredLength) {
    throw new Error(`密钥长度不足 ${requiredLength} 字节`);
  }
  // 如果密钥过长，截取所需长度
  return key.slice(0, requiredLength);
};

const validateIV = (iv: string, mode: string): string => {
  if (mode === 'ECB') return ''; // ECB 模式不需要 IV
  if (!iv && mode !== 'ECB') {
    throw new Error('除 ECB 模式外，其他模式都需要 IV');
  }
  // IV 应该是 16 字节
  if (iv.length < 16) {
    throw new Error('IV 长度不足 16 字节');
  }
  return iv.slice(0, 16);
};

// 获取 CryptoJS 的填充模式
const getPadding = (paddingMode: string) => {
  switch (paddingMode) {
    case 'PKCS7':
      return CryptoJS.pad.Pkcs7;
    case 'ZeroPadding':
      return CryptoJS.pad.ZeroPadding;
    case 'NoPadding':
      return CryptoJS.pad.NoPadding;
    default:
      return CryptoJS.pad.Pkcs7;
  }
};

// 获取 CryptoJS 的加密模式
const getCipherMode = (mode: string) => {
  switch (mode) {
    case 'CBC':
      return CryptoJS.mode.CBC;
    case 'ECB':
      return CryptoJS.mode.ECB;
    case 'CFB':
      return CryptoJS.mode.CFB;
    case 'OFB':
      return CryptoJS.mode.OFB;
    case 'CTR':
      return CryptoJS.mode.CTR;
    default:
      return CryptoJS.mode.CBC;
  }
};

export const encrypt = (text: string, options: AESOptions): string => {
  try {
    if (!text) throw new Error('请输入要加密的内容');
    if (!options.key) throw new Error('请输入密钥');

    const key = validateKey(options.key, options.keySize);
    const iv = validateIV(options.iv, options.mode);

    // 创建加密配置
    const config: CryptoJS.lib.CipherCfg = {
      mode: getCipherMode(options.mode),
      padding: getPadding(options.padding),
    };

    if (options.mode !== 'ECB') {
      config.iv = CryptoJS.enc.Utf8.parse(iv);
    }

    // 创建密钥
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    
    // 加密
    const encrypted = CryptoJS.AES.encrypt(text, keyBytes, config);

    // 根据选择的编码格式输出
    switch (options.encoding) {
      case 'base64':
        return encrypted.toString();
      case 'hex':
        return encrypted.ciphertext.toString();
      case 'utf8':
        return encrypted.toString(CryptoJS.enc.Utf8);
      default:
        return encrypted.toString();
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('加密失败');
  }
};

export const decrypt = (ciphertext: string, options: AESOptions): string => {
  try {
    if (!ciphertext) throw new Error('请输入要解密的内容');
    if (!options.key) throw new Error('请输入密钥');

    const key = validateKey(options.key, options.keySize);
    const iv = validateIV(options.iv, options.mode);

    // 创建解密配置
    const config: CryptoJS.lib.CipherCfg = {
      mode: getCipherMode(options.mode),
      padding: getPadding(options.padding),
    };

    if (options.mode !== 'ECB') {
      config.iv = CryptoJS.enc.Utf8.parse(iv);
    }

    // 创建密钥
    const keyBytes = CryptoJS.enc.Utf8.parse(key);

    // 根据编码格式处理输入
    let ciphertextParams;
    switch (options.encoding) {
      case 'base64':
        ciphertextParams = CryptoJS.enc.Base64.parse(ciphertext);
        break;
      case 'hex':
        ciphertextParams = CryptoJS.enc.Hex.parse(ciphertext);
        break;
      case 'utf8':
        ciphertextParams = CryptoJS.enc.Utf8.parse(ciphertext);
        break;
      default:
        ciphertextParams = CryptoJS.enc.Base64.parse(ciphertext);
    }

    // 解密
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertextParams },
      keyBytes,
      config
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw error instanceof Error ? error : new Error('解密失败');
  }
};

// 生成随机密钥
export const generateRandomKey = (size: number): string => {
  const length = size / 8;
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => String.fromCharCode(b))
    .join('');
};

// 生成随机 IV
export const generateRandomIV = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => String.fromCharCode(b))
    .join('');
}; 