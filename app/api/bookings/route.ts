import { NextResponse } from "next/server";
import { createBooking } from "@/lib/actions/booking.actions";
import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await createBooking(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req:Request) {
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
  }
    
    try{
        await connectDB();
        const events = await Booking.find().sort({createdAt: -1});

        return NextResponse.json({message: 'Events fetched successfully', events}, {status:200})
    } catch(e){
        return NextResponse.json({message: 'Event fetching failed', error: e}, {status:500})
    }
}