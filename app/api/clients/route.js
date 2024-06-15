import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { companyName, companyLogo, email, password, telephone } =
    await request.json();
  await connectMongoDB();
  await Client.create({ companyName, companyLogo, email, password, telephone });

  return NextResponse.json({ message: "Client created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const clients = await Client.find();
  return NextResponse.json({ clients });
}
