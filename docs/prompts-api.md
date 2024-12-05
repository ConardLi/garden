# Prompts API 文档

## 目录
- [获取提示词列表](#获取提示词列表)
- [创建提示词](#创建提示词)
- [获取单个提示词](#获取单个提示词)
- [更新提示词](#更新提示词)
- [删除提示词](#删除提示词)

## 获取提示词列表

**接口地址**：`/api/prompts`  
**请求方法**：`GET`  
**响应格式**：`JSON`

### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| limit | number | 否 | 每页条数，默认 10，最大 50 |
| source | number | 否 | 来源筛选 |
| tags | string | 否 | 标签筛选，多个用逗号分隔 |
| search | string | 否 | 搜索关键词（标题和描述） |

### 响应参数
```json
{
  "prompts": [{
    "_id": "string",
    "title": "string",
    "enTitle": "string",
    "description": "string",
    "enDescription": "string",
    "prompt": "string",
    "enPrompt": "string",
    "source": "number",
    "tags": ["string"],
    "enTags": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "pages": "number"
  }
}
```

## 创建提示词

**接口地址**：`/api/prompts`  
**请求方法**：`POST`  
**请求格式**：`JSON`

### 请求参数
```json
{
  "title": "string",
  "enTitle": "string",
  "description": "string",
  "enDescription": "string",
  "prompt": "string",
  "enPrompt": "string",
  "source": "number",
  "tags": ["string"],
  "enTags": ["string"]
}
```

### 响应参数
返回创建的提示词对象。

### 错误码
- 400: 参数错误
- 500: 服务器错误

## 获取单个提示词

**接口地址**：`/api/prompts/[id]`  
**请求方法**：`GET`  
**响应格式**：`JSON`

### 响应参数
```json
{
  "_id": "string",
  "title": "string",
  "enTitle": "string",
  "description": "string",
  "enDescription": "string",
  "prompt": "string",
  "enPrompt": "string",
  "source": "number",
  "tags": ["string"],
  "enTags": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

### 错误码
- 404: 提示词不存在
- 500: 服务器错误

## 更新提示词

**接口地址**：`/api/prompts/[id]`  
**请求方法**：`PUT`  
**请求格式**：`JSON`

### 请求参数
```json
{
  "title": "string",
  "enTitle": "string",
  "description": "string",
  "enDescription": "string",
  "prompt": "string",
  "enPrompt": "string",
  "source": "number",
  "tags": ["string"],
  "enTags": ["string"]
}
```

### 响应参数
返回更新后的提示词对象。

### 错误码
- 400: 参数错误
- 404: 提示词不存在
- 500: 服务器错误

## 删除提示词

**接口地址**：`/api/prompts/[id]`  
**请求方法**：`DELETE`

### 响应参数
返回被删除的提示词对象。

### 错误码
- 404: 提示词不存在
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
