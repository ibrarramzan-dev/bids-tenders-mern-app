import connectMongoDB from "@/libs/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const supplier = await Supplier.findOne({ _id: id });

  return NextResponse.json({ supplier }, { status: 200 });
}
