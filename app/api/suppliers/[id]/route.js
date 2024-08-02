import connectMongoDB from "@/libs/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const supplier = await Supplier.findOne({ _id: id });

  return NextResponse.json({ supplier }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const payload = await request.json();

  delete payload.email;
  console.log("Payload: ", payload);

  const supplier = await Supplier.findByIdAndUpdate(id, payload, {
    returnOriginal: false,
  });

  console.log("supplier: ", supplier);

  return NextResponse.json({ data: supplier, success: true }, { status: 200 });
}
