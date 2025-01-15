import { NextRequest, NextResponse } from 'next/server';
import Prompt from '@/models/prompt';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/utils/server/auth-decorator';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).lean();
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(prompt);
  } catch (error: any) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    );
  }
}

async function put(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const prompt = await Prompt.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(prompt);
  } catch (error: any) {
    console.error('Error updating prompt:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update prompt' },
      { status: 400 }
    );
  }
}

async function del(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const prompt = await Prompt.findByIdAndDelete(params.id).lean();
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(prompt);
  } catch (error: any) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json(
      { error: 'Failed to delete prompt' },
      { status: 500 }
    );
  }
}

export const PUT = requireAuth(
  {
    allowedRoles: ['admin'],
    errorMessage: '需要管理员权限'
  },
  put
);


export const DELETE = requireAuth(
  {
    allowedRoles: ['admin'],
    errorMessage: '需要管理员权限'
  },
  del
);