import { NextResponse } from 'next/server';
import { createTempQRCode, loginSessions } from '@/utils/wechat';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    // 生成唯一的场景值
    const sceneStr = uuidv4();
    
    // 创建临时二维码
    const qrCode = await createTempQRCode(sceneStr);
    
    // 存储登录会话
    loginSessions.set(sceneStr, {
      status: 'pending',
      createTime: Date.now()
    });

    return NextResponse.json({
      success: true,
      data: {
        sceneStr,
        qrCodeUrl: `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(qrCode.ticket)}`,
        expireIn: qrCode.expire_seconds
      }
    });
  } catch (error) {
    console.error('Create QR code error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create QR code'
    }, { status: 500 });
  }
}
