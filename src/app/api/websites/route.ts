import { NextRequest, NextResponse } from 'next/server';
import Website from '@/models/website';
import { connectDB } from '@/lib/db';

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

    if (type) {
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

    const [websites, total] = await Promise.all([
      Website.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Website.countDocuments(query)
    ]);

    return NextResponse.json({
      websites,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching websites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const website = new Website(body);
    await website.save();

    return NextResponse.json(website, { status: 201 });
  } catch (error: any) {
    console.error('Error creating website:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create website' },
      { status: 400 }
    );
  }
}
