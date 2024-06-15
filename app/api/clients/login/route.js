import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  const client = await Client.findOne({ email, password });

  return NextResponse.json(
    {
      message: client ? "Client authorized" : "Client not authorized",
      success: client ? true : false,
    },
    { status: 200 }
  );
}
