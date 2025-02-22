import { NextResponse } from 'next/server';
import connectDB from 'src/lib/mongodb';
import { FormService } from 'src/services/formService';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const form = await FormService.getFormById(params.id);
    return NextResponse.json(form);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === 'Form not found' ? 404 : 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const form = await FormService.updateForm(params.id, body);
    return NextResponse.json(form);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message },
      { status: error.message === 'Form not found' ? 404 : 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await FormService.deleteForm(params.id);
    return NextResponse.json(
      { message: 'Form deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === 'Form not found' ? 404 : 500 }
    );
  }
} 