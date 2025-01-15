# 网站管理 API 文档

## 目录
- [获取网站列表](#获取网站列表)
- [创建网站](#创建网站)
- [获取单个网站](#获取单个网站)
- [更新网站](#更新网站)
- [删除网站](#删除网站)

## 获取网站列表

**接口地址**：`/api/websites`  
**请求方法**：`GET`  
**响应格式**：`JSON`

### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| limit | number | 否 | 每页条数，默认 10，最大 50 |
| type | string | 否 | 网站类型筛选 |
| search | string | 否 | 搜索关键词（标题和描述） |
| titles | string | 否 | 按标题筛选，多个用逗号分隔 |

### 响应参数
```json
{
  "websites": [{
    "_id": "string",
    "title": "string",
    "description": "string",
    "type": "string",
    // 其他网站字段
  }],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "pages": "number"
  }
}
```

## 创建网站

**接口地址**：`/api/websites`  
**请求方法**：`POST`  
**请求格式**：`JSON`

### 请求参数
```json
{
  "title": "string",
  "description": "string",
  "type": "string"
  // 其他网站字段
}
```

### 响应参数
返回创建的网站对象。

### 错误码
- 400: 参数错误
- 500: 服务器错误

## 获取单个网站

**接口地址**：`/api/websites/[id]`  
**请求方法**：`GET`  
**响应格式**：`JSON`

### 响应参数
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "type": "string"
  // 其他网站字段
}
```

### 错误码
- 404: 网站不存在
- 500: 服务器错误

## 更新网站

**接口地址**：`/api/websites/[id]`  
**请求方法**：`PUT`  
**请求格式**：`JSON`

### 请求参数
```json
{
  "title": "string",
  "description": "string",
  "type": "string"
  // 需要更新的字段
}
```

### 响应参数
返回更新后的网站对象。

### 错误码
- 400: 参数错误
- 404: 网站不存在
- 500: 服务器错误

## 删除网站

**接口地址**：`/api/websites/[id]`  
**请求方法**：`DELETE`

### 响应参数
```json
{
  "message": "Website deleted successfully"
}
```

### 错误码
- 404: 网站不存在
- 500: 服务器错误

## 注意事项
1. 所有接口返回的 HTTP 状态码：
   - 200: 成功
   - 201: 创建成功（仅 POST 请求）
   - 400: 请求参数错误
   - 404: 资源不存在
   - 500: 服务器错误

2. 错误响应格式：
```json
{
  "error": "错误信息描述"
}
```
