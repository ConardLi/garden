# 请求工具函数文档

这个模块提供了一套统一的 HTTP 请求工具函数，用于处理前端的 API 请求。它封装了 `fetch` API，提供了更便捷的使用方式，并自动处理了认证 token、错误处理等通用逻辑。

## 主要特性

- 自动处理请求参数
- 自动携带认证 token
- 统一的错误处理
- 支持 GET、POST、PUT、DELETE 等请求方法
- TypeScript 支持

## API 参考

### request(url, options)

基础请求函数，其他所有请求方法都基于此函数。

**参数：**
- `url: string` - 请求地址
- `options: object` - 请求选项
  - `params?: object` - URL 查询参数
  - `method?: string` - 请求方法
  - `headers?: object` - 请求头
  - `body?: any` - 请求体
  - 其他 fetch API 支持的选项

**返回值：**
- `Promise<any>` - 返回解析后的响应数据

**示例：**
```typescript
const data = await request('/api/users', {
  method: 'GET',
  params: { page: 1 }
});
```

### get(url, params)

发送 GET 请求。

**参数：**
- `url: string` - 请求地址
- `params?: object` - URL 查询参数

**示例：**
```typescript
const users = await get('/api/users', { page: 1, pageSize: 10 });
```

### post(url, data)

发送 POST 请求。

**参数：**
- `url: string` - 请求地址
- `data?: any` - 请求数据，会被自动转换为 JSON

**示例：**
```typescript
const user = await post('/api/users', {
  name: '张三',
  age: 18
});
```

### put(url, data)

发送 PUT 请求。

**参数：**
- `url: string` - 请求地址
- `data?: any` - 请求数据，会被自动转换为 JSON

**示例：**
```typescript
const user = await put('/api/users/123', {
  name: '张三',
  age: 19
});
```

### del(url)

发送 DELETE 请求。

**参数：**
- `url: string` - 请求地址

**示例：**
```typescript
await del('/api/users/123');
```

## 错误处理

所有请求函数都会自动处理以下情况：

1. 401 错误（未认证）
   - 自动清除本地存储的 token
   - 抛出错误信息

2. 其他错误
   - 抛出服务器返回的错误信息或默认错误信息
   - 在控制台打印详细错误日志

错误处理示例：
```typescript
try {
  const data = await get('/api/protected-resource');
} catch (error) {
  if (error.message.includes('401')) {
    // 处理认证错误
  } else {
    // 处理其他错误
  }
}
```

## 认证

请求工具会自动从 localStorage 中获取 token 并添加到请求头中：

```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## 注意事项

1. 所有请求默认使用 JSON 格式
2. GET 请求的参数会自动转换为 URL 查询参数
3. POST 和 PUT 请求的数据会自动转换为 JSON
4. 401 错误会自动清除 token
5. 支持在服务端和客户端使用（自动检测环境）
