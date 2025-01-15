# 登录与权限验证机制

本文档详细介绍了系统的登录和权限验证机制。

## 目录

- [登录机制](#登录机制)
- [权限验证](#权限验证)
- [使用示例](#使用示例)
- [类型定义](#类型定义)
- [最佳实践](#最佳实践)

## 登录机制

系统使用 JWT (JSON Web Token) 进行身份验证。登录流程如下：

1. 用户登录成功后，服务器生成包含用户信息的 JWT token
2. token 存储在客户端的 localStorage 中
3. 后续请求通过 Authorization header 携带 token
4. 服务器验证 token 的有效性和过期时间

### Token 格式

```typescript
// token 中包含的用户信息
interface UserToken {
  userId: string;     // 用户ID
  role: string;       // 用户角色
  nickname: string;   // 用户昵称
  // ... 其他用户信息
}
```

### 请求格式

```typescript
// 请求头格式
headers: {
  'Authorization': 'Bearer <your-token-here>'
}
```

## 权限验证

系统提供了灵活的权限验证机制，支持多种验证方式：

### 1. 基本登录验证

只验证用户是否登录，适用于需要登录但不需要特定权限的接口。

### 2. 用户ID验证

验证请求是否来自特定用户，适用于用户只能访问自己数据的场景。

### 3. 角色验证

验证用户是否具有特定角色，适用于需要角色权限的管理接口。

### 4. 自定义验证

支持自定义验证逻辑，可以实现复杂的权限控制。

## 使用示例

### 1. 基本登录验证

```typescript
// 只需要验证登录
export const GET = requireAuth(async (request: NextRequest) => {
  const user = (request as any).user;  // 可以直接获取用户信息
  return NextResponse.json({ data: 'protected data' });
});
```

### 2. 用户ID验证

```typescript
// 验证特定用户ID
export const POST = requireAuth(
  {
    allowedUserIds: ['123', '456'],
    errorMessage: '您没有权限访问此资源'
  },
  async (request: NextRequest) => {
    // 处理请求
    return NextResponse.json({ success: true });
  }
);
```

### 3. 角色验证

```typescript
// 验证用户角色
export const PUT = requireAuth(
  {
    allowedRoles: ['admin', 'editor'],
    errorMessage: '需要管理员权限'
  },
  async (request: NextRequest) => {
    // 处理请求
    return NextResponse.json({ success: true });
  }
);
```

### 4. 自定义验证

```typescript
// 自定义验证逻辑
export const DELETE = requireAuth(
  {
    validator: async (user, request) => {
      // 例如：检查用户积分
      return user.points >= 100;
    },
    errorMessage: '需要100积分才能执行此操作'
  },
  async (request: NextRequest) => {
    // 处理请求
    return NextResponse.json({ success: true });
  }
);
```

## 类型定义

### 权限验证选项

```typescript
interface AuthOptions {
  // 允许访问的用户ID列表
  allowedUserIds?: string[];
  
  // 允许访问的角色列表
  allowedRoles?: string[];
  
  // 自定义验证函数
  validator?: (user: any, request: NextRequest) => boolean | Promise<boolean>;
  
  // 自定义错误消息
  errorMessage?: string;
}
```

### 函数签名

```typescript
// 处理函数类型
type HandlerFunction = (request: NextRequest) => Promise<NextResponse>;

// 函数重载
function requireAuth(options?: AuthOptions): HandlerFunction;
function requireAuth(handler: HandlerFunction): HandlerFunction;
function requireAuth(options: AuthOptions, handler: HandlerFunction): HandlerFunction;
```

## 最佳实践

1. **选择合适的验证级别**
   - 普通接口：使用基本登录验证
   - 用户数据接口：使用用户ID验证
   - 管理接口：使用角色验证
   - 特殊功能：使用自定义验证

2. **错误处理**
   - 始终提供友好的错误消息
   - 使用合适的 HTTP 状态码
     - 401：未登录或 token 过期
     - 403：权限不足
     - 200：验证通过

3. **安全建议**
   - 定期轮换 JWT 密钥
   - 设置合理的 token 过期时间
   - 实现 token 刷新机制
   - 在敏感操作时重新验证用户身份

4. **性能优化**
   - 缓存用户权限信息
   - 使用高效的角色验证算法
   - 避免复杂的自定义验证逻辑

## 注意事项

1. token 中不要存储敏感信息
2. 始终在服务端验证权限，不要仅依赖前端验证
3. 定期检查和更新权限配置
4. 记录权限验证失败的日志
5. 考虑实现权限的动态配置
