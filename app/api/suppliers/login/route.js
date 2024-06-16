import connectMongoDB from "@/libs/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  const supplier = await Supplier.findOne({ email, password });

  const response = {
    message: "Supplier not authorized",
    success: false,
  };

  if (supplier) {
    response.message = "Supplier authorized";
    response.success = true;
    response.data = supplier;
  }

  return NextResponse.json(response, { status: 200 });
}
