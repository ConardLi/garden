import { NextRequest, NextResponse } from 'next/server';
import Prompt from '@/models/prompt';
import { connectDB } from '@/lib/db';

const MAX_LIMIT = 50;

const LIST_FIELDS1 = {
  _id: 1,
  title: 1,
  description: 1,
  tags: 1,
  enTitle: 1,
  enDescription: 1,
  enTags: 1,
};


// 列表接口只返回必要字段
const LIST_FIELDS = {
  _id: 1,
  title: 1,
  description: 1,
  prompt: 1,
  enTitle: 1,
  enDescription: 1,
  enPrompt: 1,
  source: 1,
  tags: 1,
  enTags: 1,
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), MAX_LIMIT);
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const hide = searchParams.get('hide');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    const query: any = {};

    if (source) {
      query.source = parseInt(source);
    }

    if (tags && tags.length > 0 && tags[0] !== '全部') {
      query.$or = [
        { tags: { $in: tags } },
        { enTags: { $in: tags } }
      ];
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { enTitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { enDescription: { $regex: search, $options: 'i' } }
      ];
    }

    const [prompts, total] = await Promise.all([
      Prompt.find(query, hide ? LIST_FIELDS1 : LIST_FIELDS)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Prompt.countDocuments(query)
    ]);

    return NextResponse.json({
      prompts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const prompt = new Prompt(body);
    await prompt.save();

    return NextResponse.json(prompt, { status: 201 });
  } catch (error: any) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create prompt' },
      { status: 400 }
    );
  }
}
