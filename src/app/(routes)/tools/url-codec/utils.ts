export type EncodeMode = 'encodeURI' | 'encodeURIComponent';

export const encode = (text: string, encodeMode: EncodeMode): string => {
  try {
    return encodeMode === 'encodeURI' ? 
      encodeURI(text) : 
      encodeURIComponent(text);
  } catch (error) {
    console.error('编码失败:', error);
    throw new Error('编码失败');
  }
};

export const decode = (text: string, encodeMode: EncodeMode): string => {
  try {
    return encodeMode === 'encodeURI' ? 
      decodeURI(text) : 
      decodeURIComponent(text);
  } catch (error) {
    console.error('解码失败:', error);
    throw new Error('解码失败');
  }
};

export const getEncodeModeDescription = (mode: EncodeMode): string => {
  switch (mode) {
    case 'encodeURI':
      return '不编码 URL 中的特殊字符 ( / ? : @ & = + $ , # )';
    case 'encodeURIComponent':
      return '编码所有特殊字符，适用于编码 URL 参数';
    default:
      return '';
  }
}; 