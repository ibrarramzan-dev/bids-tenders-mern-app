import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const bid = await Bid.findOne({ _id: id });

  return NextResponse.json({ bid }, { status: 200 });
}
