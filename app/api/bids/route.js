import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    bidClassification,
    agencyName,
    title,
    type,
    region,
    city,
    closingDate,
    description,
    eTendering,
    submissionLink,
    submissionEmail,
    isPublished,
  } = await request.json();
  await connectMongoDB();
  await Bid.create({
    bidClassification,
    agencyName,
    title,
    type,
    region,
    city,
    closingDate,
    description,
    eTendering,
    submissionLink,
    submissionEmail,
    isPublished,
  });

  return NextResponse.json({ message: "Bid created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const bids = await Bid.find({ isPublished: true });

  return NextResponse.json({ bids });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Bid.findByIdAndDelete(id);

  return NextResponse.json({ message: "Bid deleted" }, { status: 200 });
}
