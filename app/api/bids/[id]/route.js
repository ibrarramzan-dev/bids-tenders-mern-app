import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  await connectMongoDB();

  const bid = await Bid.findOne({ _id: id });

  return NextResponse.json({ bid }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const payload = await request.json();

  await connectMongoDB();
  await Bid.findByIdAndUpdate(id, payload);

  return NextResponse.json(
    { message: "Bid updated", success: true },
    { status: 200 }
  );
}
