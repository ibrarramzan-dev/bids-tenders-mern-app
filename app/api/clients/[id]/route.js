import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const client = await Client.findOne({ _id: id });

  return NextResponse.json({ client }, { status: 200 });
}
