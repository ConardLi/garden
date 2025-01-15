import { NextResponse } from 'next/server';
import { loginSessions } from '@/utils/server/wechat';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sceneStr = searchParams.get('sceneStr');

  if (!sceneStr) {
    return NextResponse.json({
      success: false,
      error: 'Scene string is required'
    }, { status: 400 });
  }

  const session = loginSessions.get(sceneStr);
  
  if (!session) {
    return NextResponse.json({
      success: false,
      error: 'Invalid scene string'
    }, { status: 404 });
  }

  // 检查是否过期
  if (Date.now() - session.createTime > 300000) { // 5分钟过期
    session.status = 'expired';
    loginSessions.delete(sceneStr);
    return NextResponse.json({
      success: true,
      data: {
        status: 'expired'
      }
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      status: session.status,
      openid: session.openid
    }
  });
}
