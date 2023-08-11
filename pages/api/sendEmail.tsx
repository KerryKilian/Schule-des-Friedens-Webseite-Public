import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.web.de",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const { name, telephone, email, message } = req.body;

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS_RECEIVER,
      subject: "Neue Anfrage von der Webseite",
      text: `Name: ${name}\nTelefon: ${telephone}\nEmail: ${email}\nNachricht: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
