import { NextResponse } from 'next/server';
import { loginSessions } from '@/utils/server/wechat';
import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';

const secret = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/secret.json'), 'utf-8')
).jwtSecret;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sceneStr } = body;

    if (!sceneStr) {
      return NextResponse.json({
        success: false,
        error: 'Scene string is required'
      }, { status: 400 });
    }

    const session = loginSessions.get(sceneStr);
    
    if (!session || session.status !== 'scanned' || !session.openid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid login session'
      }, { status: 400 });
    }

    // 生成JWT token
    const token = sign(
      { 
        openid: session.openid,
        // 这里可以添加其他用户信息
      },
      secret.token,
      { expiresIn: '7d' }
    );

    // 更新会话状态
    session.status = 'confirmed';

    // 返回token
    return NextResponse.json({
      success: true,
      data: {
        token,
        openid: session.openid
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 });
  }
}
