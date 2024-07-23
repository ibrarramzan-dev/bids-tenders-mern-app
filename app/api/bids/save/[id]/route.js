// export async function PUT(request, { params }) {
//   const { id } = params;
//   const payload = await request.json();

import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";

//   await connectMongoDB();
//   await Bid.findByIdAndUpdate(id, payload);

//   return NextResponse.json(
//     { message: "Bid updated", success: true },
//     { status: 200 }
//   );
// }

export async function PUT(request, { params }) {
  const { id } = params;
  const supplierId = request.nextUrl.searchParams.get("supplierId");

  await connectMongoDB();

  await Bid.findOneAndUpdate(
    { _id: id },
    { $addToSet: { savedTo: { supplierId } } }
  );

  return NextResponse.json(
    { message: "Bid updated", success: true },
    { status: 200 }
  );
}

// export async function PUT(request) {
//   const clientId = request.nextUrl.searchParams.get("clientId");
//   const clientId = request.nextUrl.searchParams.get("clientId");

//   await connectMongoDB();
//   await Bid.findByIdAndUpdate(id);

//   return NextResponse.json(
//     { message: "Bid deleted", success: true },
//     { status: 200 }
//   );
// }
