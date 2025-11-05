import bcrypt from "bcryptjs";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
  }
  
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
