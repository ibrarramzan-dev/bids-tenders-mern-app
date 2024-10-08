import connectMongoDB from "@/libs/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    agencyName,
    agencyLogo,
    scopeOfOperation,
    experience,
    email,
    password,
    telephone,
  } = await request.json();

  await connectMongoDB();

  const newSupplier = await Supplier.create({
    agencyName,
    agencyLogo,
    scopeOfOperation,
    experience,
    email,
    password,
    telephone,
  });

  return NextResponse.json(
    { message: "Supplier created", success: true, data: newSupplier },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  const suppliers = await Supplier.find();

  return NextResponse.json(suppliers);
}
