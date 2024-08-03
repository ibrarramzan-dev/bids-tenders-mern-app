import connectMongoDB from "@/libs/mongodb";
import Bid from "@/models/bid";
import { message } from "antd";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// const nodeMailer = require("nodemailer");

let transportmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ibrarramzan.dev@gmail.com",
    pass: "twco vshv ljnp hhso",
  },
});

let mailContent = {
  subject: "New Bid Evaluation",
  text: `<p>Dear [Evaluation Committee member name], 
  This message serves as a reminder that you have been selected as a member of the evaluation committee for 
  “Bid Title” with Bid Number: “Bid Number”. To facilitate your access to the necessary evaluation materials, 
  please use the  following access key: [XXXX] Somali Bids.</p>`,
};

export async function POST(request) {
  const payload = await request.json();

  console.log("Payload: ", payload);

  await connectMongoDB();

  await Bid.create(payload);

  /* send email to Evaluation panel members */
  const { members } = payload;
  console.log("Members: ", members);

  const recipients = members.map((member) => member.email);

  console.log("recipients: ", recipients);

  transportmail.sendMail(
    { ...mailContent, to: recipients },
    function (err, val) {
      if (err) {
        console.log(err);
      } else {
        console.log(val.response, "sent Mail...");
      }
    }
  );

  return NextResponse.json(
    { message: "Bid created", success: true },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const bids = await Bid.find();

  return NextResponse.json(bids);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Bid.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Bid deleted", success: true },
    { status: 200 }
  );
}
