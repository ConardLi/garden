import { NextRequest, NextResponse } from 'next/server';
import { QRCodeSessionModel } from '@/models/qrcode-session';
import { UserModel } from '@/models/user';
import { connectDB } from '@/utils/server/db';

interface WxLoginBody {
  qrcodeId: string;
  code: string;
  userInfo: {
    nickName: string;
    avatarUrl: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json() as WxLoginBody;
    const { qrcodeId, code, userInfo } = body;

    if (!qrcodeId || !code || !userInfo) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 查询二维码会话
    const session = await QRCodeSessionModel.findOne({ qrcodeId }).lean();

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid QR code session' },
        { status: 404 }
      );
    }

    if (session.status === 'expired') {
      return NextResponse.json(
        { error: 'QR code session expired' },
        { status: 400 }
      );
    }

    // TODO: 调用微信接口获取openId
    const openId = 'mock-openid'; // 这里需要替换为实际的微信接口调用

    // 查找或创建用户
    let user = await UserModel.findOne({ openId }).lean();
    
    if (!user) {
      user = await UserModel.create({
        openId,
        nickname: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      });
    } else {
      // 更新用户信息
      await UserModel.findOneAndUpdate(
        { openId },
        {
          nickname: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      );
    }

    // 更新二维码会话状态
    await QRCodeSessionModel.findOneAndUpdate(
      { qrcodeId },
      {
        status: 'success' as const,
        userId: user._id,
        userInfo: {
          nickname: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process WeChat login:', error);
    return NextResponse.json(
      { error: 'Failed to process WeChat login' },
      { status: 500 }
    );
  }
} 