import { useState, useCallback } from 'react';
import MD5 from 'crypto-js/md5';

export const useMD5 = () => {
  const [input, setInput] = useState('');
  const [isUpperCase, setIsUpperCase] = useState(true);

  const generateMD5 = useCallback((text: string) => {
    if (!text) return '';
    const hash = MD5(text).toString();
    return isUpperCase ? hash.toUpperCase() : hash.toLowerCase();
  }, [isUpperCase]);

  return {
    input,
    setInput,
    isUpperCase,
    setIsUpperCase,
    hash: generateMD5(input)
  };
}; 