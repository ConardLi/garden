import md5 from 'crypto-js/md5';
import { MD5Options } from './types';

export const calculateMD5 = (input: string, options: MD5Options): string => {
  let result = input;

  // 添加盐值
  if (options.salt) {
    if (options.saltPosition === 'prepend' || options.saltPosition === 'both') {
      result = options.salt + result;
    }
    if (options.saltPosition === 'append' || options.saltPosition === 'both') {
      result = result + options.salt;
    }
  }

  // 多次迭代
  for (let i = 0; i < options.iterations; i++) {
    result = md5(result).toString();
  }

  // 转换大小写
  return options.uppercase ? result.toUpperCase() : result.toLowerCase();
};

// 保存历史记录
export const saveToHistory = (input: string, result: string, options: MD5Options) => {
  const history = getHistory();
  history.unshift({
    input,
    result,
    options,
    timestamp: Date.now(),
  });
  
  // 只保留最近的50条记录
  if (history.length > 50) {
    history.pop();
  }
  
  localStorage.setItem('md5_history', JSON.stringify(history));
};

// 获取历史记录
export const getHistory = () => {
  const history = localStorage.getItem('md5_history');
  return history ? JSON.parse(history) : [];
};

// 清除历史记录
export const clearHistory = () => {
  localStorage.removeItem('md5_history');
}; 