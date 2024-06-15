import connectMongoDB from "@/libs/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  const supplier = await Supplier.findOne({ email, password });

  return NextResponse.json(
    {
      message: supplier ? "Supplier authorized" : "Supplier not authorized",
      success: supplier ? true : false,
    },
    { status: 200 }
  );
}
