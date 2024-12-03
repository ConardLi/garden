import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const useQueryParams = <T extends Record<string, string>>(defaultParams: T) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState<T>(defaultParams);

  // 从 URL 读取参数
  useEffect(() => {
    const newParams = { ...defaultParams };
    
    (Object.keys(defaultParams) as Array<keyof T>).forEach(key => {
      const value = searchParams.get(key as string);
      if (value) {
        newParams[key] = value as T[keyof T];
      }
    });

    setParams(newParams);
  }, [searchParams]);

  // 更新 URL 参数
  const updateParams = useCallback((newParams: Partial<T>) => {
    const updatedParams = { ...params, ...newParams };
    const urlSearchParams = new URLSearchParams();
    
    // 设置所有参数
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value) {
        urlSearchParams.set(key, value);
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';
    
    router.replace(`${window.location.pathname}${query}`);
  }, [router, params]);

  return { params, updateParams };
};
