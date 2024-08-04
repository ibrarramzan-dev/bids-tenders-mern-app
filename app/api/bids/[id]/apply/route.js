import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const supplierId = request.nextUrl.searchParams.get("supplierId");

  await connectMongoDB();

  await Bid.findOneAndUpdate(
    { _id: id },
    { $addToSet: { appliedBy: supplierId } }
  );

  return NextResponse.json(
    { message: "Applied", success: true },
    { status: 200 }
  );
}
