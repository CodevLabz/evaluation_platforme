import { NextResponse } from 'next/server';
import connectDB from 'src/lib/mongodb';
import { FormService } from 'src/services/formService';
import { setCorsHeaders } from 'src/utils/cors';
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
}
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const headers = request.headers;

    const technicalMetadata = {
      ip: headers.get('x-forwarded-for') || 'unknown',
      userAgent: headers.get('user-agent') || 'unknown',
      referrer: headers.get('referer') || 'unknown',
      finalVersion: body.finalVersion ?? false
    };

    const form = await FormService.createForm(body, technicalMetadata);

    return NextResponse.json(
      { message: 'Form submitted successfully', formId: form._id },
      { status: 201 }
    );

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Invalid form type' ? 400 : 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = {
      formType: searchParams.get('type') || undefined,
      userId: searchParams.get('userId') || undefined
    };

    const forms = await FormService.getForms(query);
    return NextResponse.json(forms);
    
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 