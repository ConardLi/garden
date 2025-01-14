import { NextRequest, NextResponse } from 'next/server';
import { QRCodeSessionModel } from '@/models/qrcode-session';
import { connectDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // 构建查询条件
    const query: any = {};
    if (search) {
      query.qrcodeId = new RegExp(search, 'i');
    }
    if (status) {
      query.status = status;
    }

    // 执行查询
    const [items, total] = await Promise.all([
      QRCodeSessionModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      QRCodeSessionModel.countDocuments(query)
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Failed to fetch QR code sessions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
