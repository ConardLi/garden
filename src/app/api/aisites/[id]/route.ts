import { NextRequest, NextResponse } from 'next/server';
import AISite from '@/models/aisite';
import { connectDB } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const aisite = await AISite.findById(params.id).lean();
    if (!aisite) {
      return NextResponse.json(
        { error: 'AI site not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(aisite);
  } catch (error: any) {
    console.error('Error fetching AI site:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI site' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const aisite = await AISite.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!aisite) {
      return NextResponse.json(
        { error: 'AI site not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(aisite);
  } catch (error: any) {
    console.error('Error updating AI site:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update AI site' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const aisite = await AISite.findByIdAndDelete(params.id).lean();
    if (!aisite) {
      return NextResponse.json(
        { error: 'AI site not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(aisite);
  } catch (error: any) {
    console.error('Error deleting AI site:', error);
    return NextResponse.json(
      { error: 'Failed to delete AI site' },
      { status: 500 }
    );
  }
}
