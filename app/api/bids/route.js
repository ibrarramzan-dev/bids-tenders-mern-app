import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    clientId,
    classification,
    agencyName,
    agencyLogo,
    title,
    type,
    region,
    city,
    submissionClosingDate,
    description,
    status,
    attachments,
    submissionLinkOrEmail,
    featured,
    eTendering,
    members,
  } = await request.json();

  await connectMongoDB();

  await Bid.create({
    clientId,
    classification,
    agencyName,
    agencyLogo,
    title,
    type,
    region,
    city,
    submissionClosingDate,
    description,
    status,
    attachments,
    submissionLinkOrEmail,
    featured,
    eTendering,
    members,
  });

  return NextResponse.json(
    { message: "Bid created", success: true },
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

  return NextResponse.json({ message: "Bid deleted" }, { status: 200 });
}
