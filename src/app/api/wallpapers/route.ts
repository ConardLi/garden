import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/server/db';
import { BingWallpaperModel } from '@/models/bing-wallpaper';

/**
 * 获取壁纸列表
 * @param request 请求对象
 * @returns 壁纸列表和分页信息
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const keyword = searchParams.get('keyword') || '';

    await connectDB();

    const query = keyword 
      ? { copyright: { $regex: keyword, $options: 'i' } }
      : {};

    const [wallpapers, total] = await Promise.all([
      BingWallpaperModel.find(query)
        .sort({ enddate: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('_id fullSrc copyright enddate thumb')
        .lean(),
      BingWallpaperModel.countDocuments(query),
    ]);

    return NextResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: wallpapers,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error: any) {
    console.error('获取壁纸列表失败:', error);
    return NextResponse.json({
      code: 500,
      msg: error.message || '获取壁纸列表失败',
      data: null,
    }, { status: 500 });
  }
}
