import { NextRequest, NextResponse } from 'next/server';
import AISite from '@/models/aisite';
import { connectDB } from '@/utils/server/db';
import { requireAuth } from '@/utils/hoc/auth';

const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), MAX_LIMIT);
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const titles = searchParams.get('titles')?.split(',');


    const query: any = {};

    if (type && type !== '全部') {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (titles && titles.length > 0) {
      query.title = { $in: titles };
    }


    const [aisites, total] = await Promise.all([
      AISite.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      AISite.countDocuments(query)
    ]);

    return NextResponse.json({
      aisites,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching AI sites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI sites' },
      { status: 500 }
    );
  }
}

async function post(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const aisite = new AISite(body);
    await aisite.save();

    return NextResponse.json(aisite, { status: 201 });
  } catch (error: any) {
    console.error('Error creating AI site:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create AI site' },
      { status: 400 }
    );
  }
}

export const POST = requireAuth(
  {
    allowedRoles: ['admin'],
    errorMessage: '需要管理员权限'
  },
  post
);
