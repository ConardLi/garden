# API 签名校验机制

为了防止 API 被恶意调用，我们实现了一套请求签名校验机制。所有的 API 请求都需要携带有效的签名才能被处理。

## 签名参数

每个请求需要包含以下签名相关的参数：

- `timestamp`: 请求时间戳（毫秒）
- `sign`: 请求签名

## 签名算法

1. 收集所有请求参数（不包括 sign 本身）
2. 按参数名称字母顺序排序
3. 使用 `key=value` 格式拼接参数，参数之间使用 `&` 连接
4. 在最后加上签名密钥：`&key=YOUR_SIGN_KEY`
5. 对拼接后的字符串进行 MD5 加密，得到最终签名

### 示例

假设请求参数为：

```json
{
  "filename": "test.jpg",
  "size": 1024,
  "timestamp": 1642233600000
}
```

1. 参数按字母顺序排序并拼接：
```
filename=test.jpg&size=1024&timestamp=1642233600000
```

2. 加上签名密钥：
```
filename=test.jpg&size=1024&timestamp=1642233600000&key=YOUR_SIGN_KEY
```

3. 计算 MD5 得到最终签名。

## 安全机制

1. **时间戳校验**：
   - 每个请求都必须携带时间戳
   - 服务端会校验时间戳是否在有效期内（5分钟）
   - 防止请求被重放攻击

2. **参数完整性**：
   - 签名计算包含所有请求参数
   - 参数值被修改会导致签名验证失败
   - 防止参数被篡改

3. **密钥保护**：
   - 签名密钥只存在于服务端
   - 通过配置文件管理，方便更新
   - 建议定期更换密钥

## 前端使用

已经在请求库中自动集成了签名功能，正常使用 `request`、`get`、`post` 等方法发起请求即可：

```typescript
import { get, post } from '@/utils/fe/request';

// GET 请求
const data = await get('/api/resource', {
  param1: 'value1',
  param2: 'value2'
});

// POST 请求
const result = await post('/api/resource', {
  field1: 'value1',
  field2: 'value2'
});
```

## 后端使用

使用 `verifySign` 中间件来验证请求签名：

```typescript
import { verifySign } from '@/utils/server/verify-sign';

async function post(request: NextRequest) {
  // 处理请求逻辑
}

// 导出带签名验证的处理函数
export const POST = verifySign(post);
```

## 错误处理

签名验证失败会返回以下错误：

- `401 缺少签名参数`：请求缺少必要的签名参数
- `401 签名已过期`：请求的时间戳超出有效期
- `401 签名无效`：签名验证失败

## 注意事项

1. 签名验证失败会直接返回错误，不会继续处理请求
2. 时间戳使用毫秒级时间戳
3. 参数值如果为 undefined 或 null 会被忽略
4. 文件上传等场景需要在 URL 参数中带上签名信息
