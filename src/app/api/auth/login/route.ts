import { NextResponse } from 'next/server';
import User from 'src/models/User';
import connectDB from 'src/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!password || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
    } catch (bcryptError) {
      console.error('Password comparison error:', bcryptError);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 