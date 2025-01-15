import { NextRequest, NextResponse } from 'next/server';
import { QRCodeSessionModel } from '@/models/qrcode-session';
import { sign } from 'jsonwebtoken';
import { connectDB } from '@/utils/server/db';
import { readFileSync } from 'fs';
import { join } from 'path';

const JWT_SECRET = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/secret.json'), 'utf-8')
).jwtSecret;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const qrcodeId = searchParams.get('qrcodeId');

    if (!qrcodeId) {
      return NextResponse.json(
        { error: 'QR code ID is required' },
        { status: 400 }
      );
    }

    // 查询会话状态
    const session = await QRCodeSessionModel.findOne({ qrcodeId }).lean();

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid QR code session' },
        { status: 404 }
      );
    }

    // 检查是否过期
    if (new Date() > session.expireTime) {
      await QRCodeSessionModel.findOneAndUpdate(
        { qrcodeId },
        { status: 'expired' as const }
      );
      return NextResponse.json({ status: 'expired' });
    }

    // 如果登录成功，生成JWT token
    if (session.status === 'success' && session.userId) {
      const token = sign(
        { 
          userId: session.userId.toString(),
          ...session.userInfo
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        status: session.status,
        userInfo: session.userInfo,
        token
      });
    }

    return NextResponse.json({ status: session.status });
  } catch (error) {
    console.error('Failed to check login status:', error);
    return NextResponse.json(
      { error: 'Failed to check login status' },
      { status: 500 }
    );
  }
} 