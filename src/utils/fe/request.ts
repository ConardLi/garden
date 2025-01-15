/**
 * 通用请求函数
 * @param url 请求地址
 * @param options 请求选项
 * @returns Promise
 */
export async function request(url: string, options: RequestInit & { params?: Record<string, any> } = {}) {
  try {
    // 处理查询参数
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url = `${url}?${searchParams.toString()}`;
    }

    // 获取 token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // 设置请求头
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // 发送请求
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 处理响应
    if (!response.ok) {
      const error = await response.json();
      if (response.status === 401) {
        // token 过期，清除本地存储
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      }
      throw new Error(error.error || '请求失败');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Request failed:', error);
    throw error;
  }
}

/**
 * GET 请求
 */
export function get(url: string, params?: Record<string, any>) {
  return request(url, { method: 'GET', params });
}

/**
 * POST 请求
 */
export function post(url: string, data?: any) {
  return request(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 请求
 */
export function put(url: string, data?: any) {
  return request(url, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 请求
 */
export function del(url: string) {
  return request(url, { method: 'DELETE' });
}
