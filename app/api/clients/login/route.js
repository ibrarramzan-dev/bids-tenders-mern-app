import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  const client = await Client.findOne({ email, password });

  const response = {
    message: "Client not authorized",
    success: false,
  };

  console.log(client);

  if (client) {
    response.message = "Client authorized";
    response.success = true;
    response.data = client;
  }

  return NextResponse.json(response, { status: 200 });
}
