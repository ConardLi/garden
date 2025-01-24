import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { env } from '@/config/env';

const SIGN_EXPIRE_TIME = 5 * 60 * 1000; // 1分钟内有效

/**
 * 验证请求签名
 */
export function verifySign(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      // 1. 获取请求参数
      const params = Object.fromEntries(request.nextUrl.searchParams);
      const { sign, timestamp, ...restParams } = params;

      // 2. 基础检查
      if (!sign || !timestamp) {
        return NextResponse.json({ error: '缺少签名参数' }, { status: 401 });
      }

      // 3. 检查时间戳是否过期（先不做时间戳过期的校验了）
      // const now = Date.now();
      // if (now - Number(timestamp) > SIGN_EXPIRE_TIME) {
      //   return NextResponse.json({ error: '签名已过期' }, { status: 401 });
      // }

      // 4. 按照相同规则生成签名
      const keys = Object.keys({ ...restParams, timestamp }).sort();
      const signStr = keys
        .map(key => `${key}=${params[key]}`)
        .join('&');
      const signStrWithKey = `${signStr}&key=${env.apiSignKey}`;
      const serverSign = createHash('md5').update(signStrWithKey).digest('hex');

      // 5. 比对签名
      if (sign !== serverSign) {
        return NextResponse.json({ error: '签名无效' }, { status: 401 });
      }

      // 6. 验证通过，执行实际的处理函数
      return handler(request, ...args);
    } catch (error) {
      console.error('Verify sign error:', error);
      return NextResponse.json({ error: '签名验证失败' }, { status: 401 });
    }
  };
}
