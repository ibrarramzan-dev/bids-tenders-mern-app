import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;

  const { email, password } = await request.json();

  await connectMongoDB();

  const updatedClient = await Client.findOneAndUpdate(
    { _id: id },
    { $addToSet: { members: { email, password } } }
  );

  return NextResponse.json(
    { message: "Member added", success: true },
    { status: 200 }
  );
}
