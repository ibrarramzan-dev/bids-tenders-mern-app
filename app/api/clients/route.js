import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { agencyName, agencyLogo, email, password, telephone } =
    await request.json();

  await connectMongoDB();

  const newClient = await Client.create({
    agencyName,
    agencyLogo,
    email,
    password,
    telephone,
  });

  return NextResponse.json(
    { message: "Client created", success: true, data: newClient },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const clients = await Client.find();
  return NextResponse.json({ clients });
}
