import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const isClient = typeof window !== 'undefined';

function useWindowSize(): WindowSize {
  // 服务端渲染时使用默认值
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isClient ? window.innerWidth : 1920, // 默认宽度
    height: isClient ? window.innerHeight : 1080, // 默认高度
  });

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化大小

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
