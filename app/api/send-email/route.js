import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@bids-tenders-mern-app.netlify.app",
    pass: process.env.NEXT_PUBLIC_ZOHO_PWD, // App password, not the account password
  },
});

export async function POST(request) {
  const { to, subject, html } = await request.json();

  let mail = {
    from: "no-reply@bids-tenders-mern-app.netlify.app",
    to,
    subject,
    html,
  };

  transporter.sendMail(mail, function (err, val) {
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
