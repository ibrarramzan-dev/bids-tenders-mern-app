import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

let transportmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ibrarramzan.dev@gmail.com",
    pass: "twco vshv ljnp hhso",
  },
});

export async function POST(request) {
  const { to, subject, html } = await request.json();

  let mail = {
    to,
    subject,
    html,
  };

  transportmail.sendMail(mail, function (err, val) {
    if (err) {
      console.log(err);
    } else {
      console.log(val.response, "email sent");
    }
  });

  return NextResponse.json(
    { message: "Email sent", success: true },
    { status: 201 }
  );
}
