import connectMongoDB from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newPassword } = await request.json();

  await connectMongoDB();
  await Client.findByIdAndUpdate(id, { password: newPassword });

  return NextResponse.json({ message: "Password updated" }, { status: 200 });
}
