import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/models/user';
import { connectDB } from '@/utils/server/db';
import { requireAuth } from '@/utils/hoc/auth';

export const GET = requireAuth(
  {
    allowedRoles: ['admin'],
    errorMessage: '需要管理员权限'
  },
  async (request: NextRequest) => {
    try {
      await connectDB();

      const searchParams = request.nextUrl.searchParams;
      const search = searchParams.get('search');
      const page = parseInt(searchParams.get('page') || '1');
      const pageSize = parseInt(searchParams.get('pageSize') || '10');

      // 构建查询条件
      const query: any = {};
      if (search) {
        query.nickname = new RegExp(search, 'i');
      }

      // 执行查询
      const [items, total] = await Promise.all([
        UserModel.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean(),
        UserModel.countDocuments(query)
      ]);

      return NextResponse.json({
        items,
        total,
        page,
        pageSize,
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
);
