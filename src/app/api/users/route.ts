import { NextResponse } from 'next/server';
import User from 'src/models/User';
import connectDB from 'src/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, password, role } = await request.json();

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'staff', 
    });

    await user.save();

    
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };

    return NextResponse.json(
      userData,
      { status: 201 }
    );

  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 