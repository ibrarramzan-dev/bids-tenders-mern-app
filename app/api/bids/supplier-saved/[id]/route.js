import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  await connectMongoDB();

  const bids = await Bid.find({
    savedTo: { $elemMatch: { supplierId: id } },
  });

  return NextResponse.json(bids, { status: 200 });
}
