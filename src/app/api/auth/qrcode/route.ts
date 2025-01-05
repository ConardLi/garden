import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSessionModel } from '@/models/qrcode-session';
import { connectDB } from '@/lib/db';

// 二维码有效期（分钟）
const EXPIRE_MINUTES = 5;

export async function POST() {
  try {
    await connectDB();

    // 生成唯一的二维码ID
    const qrcodeId = uuidv4();
    
    // 计算过期时间
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + EXPIRE_MINUTES);

    // 创建二维码会话
    const session = await QRCodeSessionModel.create({
      qrcodeId,
      expireTime,
      status: 'pending' as const
    });

    return NextResponse.json({
      qrcodeId: session.qrcodeId,
      expireTime: session.expireTime
    });
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
} 