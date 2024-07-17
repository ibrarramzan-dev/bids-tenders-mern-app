import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const keywords = request.nextUrl.searchParams.get("keywords");
  const status = request.nextUrl.searchParams.get("status");
  const classification = request.nextUrl.searchParams.get("classification");

  console.log("status: ", status);

  await connectMongoDB();
  const bids = await Bid.find({ status, classification });

  return NextResponse.json(bids, { status: 200 });
}
