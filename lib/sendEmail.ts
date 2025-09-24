// src/lib/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendVerificationEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // or your SMTP server
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: `"Namakwala" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `
      <p>Thank you for signing up!</p>
      <p>Click the link below to verify your email and login:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  });
}
