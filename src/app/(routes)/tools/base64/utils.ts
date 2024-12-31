export const encode = (text: string): string => {
  try {
    // 处理中文等非ASCII字符
    const bytes = new TextEncoder().encode(text);
    const base64 = btoa(
      Array.from(bytes)
        .map(byte => String.fromCharCode(byte))
        .join('')
    );
    return base64;
  } catch (error) {
    console.error('编码失败:', error);
    throw new Error('编码失败');
  }
};

export const decode = (base64: string): string => {
  try {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (error) {
    console.error('解码失败:', error);
    throw new Error('解码失败');
  }
};

// 检查字符串是否是有效的 Base64
export const isValidBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}; 