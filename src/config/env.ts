// 环境变量配置
export const env = {
  // 微信配置
  wx: {
    appId: process.env.NEXT_PUBLIC_WX_APP_ID!,
    appSecret: process.env.WX_APP_SECRET!,
    encodingAESKey: process.env.WX_ENCODING_AES_KEY!,
    token: process.env.WX_TOKEN!,
  },
  
  // 腾讯云 COS 配置
  cos: {
    secretId: process.env.COS_SECRET_ID!,
    secretKey: process.env.COS_SECRET_KEY!,
    bucket: process.env.NEXT_PUBLIC_COS_BUCKET!,
    region: process.env.NEXT_PUBLIC_COS_REGION!,
    baseUrl: process.env.NEXT_PUBLIC_COS_BASE_URL!,
  },
  
  // JWT 配置
  jwtSecret: process.env.JWT_SECRET!,
  
  // 管理员配置
  adminUserId: process.env.NEXT_PUBLIC_ADMIN_USER_ID!,
  
  // API 签名密钥
  apiSignKey: process.env.NEXT_PUBLIC_API_SIGN_KEY!,
} as const;

// 类型检查确保所有环境变量都已定义
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`环境变量未定义: ${key}`);
  }
});
