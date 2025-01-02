export type AESMode = "encrypt" | "decrypt";
export type CipherMode = "CBC" | "ECB" | "CFB" | "OFB" | "CTR";
export type PaddingMode = "Pkcs7" | "ZeroPadding" | "NoPadding";
export type KeySize = 128 | 192 | 256;
export type Encoding = "base64" | "hex" | "utf8";

export interface AESOptions {
  mode: CipherMode;
  padding: PaddingMode;
  keySize: KeySize;
  key: string;
  iv: string;
  encoding: Encoding;
} 