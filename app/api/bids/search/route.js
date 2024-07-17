import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const keywords = request.nextUrl.searchParams.get("keywords");
  const status = request.nextUrl.searchParams.get("status");
  const classification = request.nextUrl.searchParams.get("classification");

  console.log("status: ", status);

  await connectMongoDB();

  const searchQuery = {};

  if (status) {
    searchQuery.status = status;
  }

  if (classification) {
    searchQuery.classification = classification;
  }

  const bids = await Bid.find(searchQuery);

  return NextResponse.json(bids, { status: 200 });
}
