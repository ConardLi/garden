# 微信登录 API 文档

## 目录
- [获取登录二维码](#获取登录二维码)
- [检查登录状态](#检查登录状态)
- [微信回调接口](#微信回调接口)
- [登录认证](#登录认证)

## 获取登录二维码
获取微信扫码登录的临时二维码。

**接口地址**：`/api/auth/wechat/qrcode`  
**请求方法**：`GET`  
**响应格式**：`JSON`

### 响应参数
```json
{
  "url": "string",      // 二维码图片URL
  "sceneStr": "string"  // 场景值，用于后续状态查询
}
```

### 错误码
- 500: 服务器内部错误

## 检查登录状态
检查用户扫码状态。

**接口地址**：`/api/auth/wechat/check`  
**请求方法**：`GET`  
**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sceneStr | string | 是 | 二维码场景值 |

### 响应参数
```json
{
  "status": "string",  // 状态：pending/scanned/confirmed/expired
  "token": "string"    // 当status为confirmed时返回JWT token
}
```

## 微信回调接口
处理微信服务器的回调请求。

**接口地址**：`/api/auth/wechat/callback`  
**请求方法**：`GET`/`POST`

### GET 请求
用于服务器配置验证。

**请求参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| signature | string | 是 | 微信加密签名 |
| timestamp | string | 是 | 时间戳 |
| nonce | string | 是 | 随机数 |
| echostr | string | 是 | 随机字符串 |

### POST 请求
处理微信消息推送。

**请求格式**：`XML`  
**响应格式**：`text/plain`

### 错误码
- 403: 签名验证失败
- 500: 服务器内部错误

## 登录认证
完成登录并获取 JWT token。

**接口地址**：`/api/auth/login`  
**请求方法**：`POST`  
**请求格式**：`JSON`

### 请求参数
```json
{
  "sceneStr": "string",  // 场景值
  "openid": "string"     // 用户的openid
}
```

### 响应参数
```json
{
  "token": "string"  // JWT token
}
```

### 错误码
- 400: 参数错误
- 401: 认证失败
- 500: 服务器内部错误

## 注意事项
1. 所有接口返回的 HTTP 状态码：
   - 200: 成功
   - 400: 请求参数错误
   - 401: 未授权
   - 403: 禁止访问
   - 500: 服务器错误

2. 错误响应格式：
```json
{
  "error": "错误信息描述"
}
```

3. 认证头格式：
```
Authorization: Bearer <token>
```
