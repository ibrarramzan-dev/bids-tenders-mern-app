import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { generateRandomString } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();

  const randomString = generateRandomString();

  const { eTendering, members } = payload;

  if (eTendering && members.length > 0) {
    payload.accessKey = randomString;
  }

  console.log("Payload: ", payload);

  await connectMongoDB();

  const bid = await Bid.create(payload);

  return NextResponse.json(
    { message: "Bid created", success: true, data: bid },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const bids = await Bid.find();

  return NextResponse.json(bids);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Bid.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Bid deleted", success: true },
    { status: 200 }
  );
}
