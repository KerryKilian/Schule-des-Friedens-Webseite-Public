import { ContactForm } from "@/src/Resources";
import { requiresAuthentication } from "@/src/backend/services/LoginService";
import { body, validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  await Promise.all([
    body("name")
      .exists()
      .withMessage("Name is required.")
      .isLength({ max: 100, min: 5 })
      .withMessage("Name must have min 5 and max 100 characters.")
      .custom((value) => !value.includes("<") && !value.includes(">"))
      .withMessage(
        "It seems you tried to insert harmful code. You are now banned from requesting this api."
      )
      .run(req),

    body("telephone")
      .isLength({ max: 20, min: 5 })
      .withMessage("Telephone number must have min 5 and max 20 characters.")
      .custom((value) => !value.includes("<") && !value.includes(">"))
      .withMessage(
        "It seems you tried to insert harmful code. You are now banned from requesting this api."
      )
      .run(req),

    body("email")
      .isLength({ max: 200, min: 5 })
      .withMessage("Email must have min 5 and max 200 characters.")
      .custom((value) => !value.includes("<") && !value.includes(">"))
      .withMessage(
        "It seems you tried to insert harmful code. You are now banned from requesting this api."
      )
      .run(req),

    body("message")
      .exists()
      .withMessage("Text is required.")
      .isLength({ max: 15000, min: 5 })
      .withMessage("Text must have at most 15000 characters.")
      .custom((value) => !value.includes("<") && !value.includes(">"))
      .withMessage(
        "It seems you tried to insert harmful code. You are now banned from requesting this api."
      )
      .run(req),
    
  ]);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  let contact: ContactForm | null = null;
    try {
      contact = req.body as ContactForm;
    } catch (error: any) {
      return res.status(400).send({
        errors: [
          {
            location: "body",
            msg: "Wrong or missing information for resource 'ContactForm'",
            path: "",
            type: "field",
            value: "",
          },
        ],
      });
    }

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "smtp.web.de",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
          pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        },
      });
    } catch (error) {
      return res.status(500).send({
        errors: [
          {
            location: "body",
            msg: "Failed to establish an email connection.",
            path: "",
            type: "field",
            value: "",
          },
        ],
      });
    }
    

    // send first email to receiver of organization
  try {
    const mailOptionsToReceiver = {
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS_RECEIVER,
      subject: "Neue Anfrage von der Webseite",
      text: `Name: ${contact.name}\nTelefon: ${contact.telephone}\nEmail: ${contact.email}\nNachricht: ${contact.message}`,
    };

    await transporter.sendMail(mailOptionsToReceiver);

  } catch (error) {
    return res.status(500).send({
      errors: [
        {
          location: "body",
          msg: "Email could not be sent to receiver",
          path: "",
          type: "field",
          value: "",
        },
      ],
    });
  }


  // send second email as confirmation to sender
  try {
    const mailOptionsConfirmation = {
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: `${contact.email}`,
      subject: "Bestätigung der Anfrage",
      text: `Hey ${contact.name},\nwir haben deine Anfrage erhalten. Wir freuen uns, dass du uns geschrieben hast und werden uns möglichst bald bei dir melden.\n
      Folgende Daten hast du uns zugeschickt:\n
      Name: ${contact.name}\nTelefon: ${contact.telephone}\nEmail: ${contact.email}\nNachricht: ${contact.message}\n\n\n
      Bitte antworte nicht auf diese Email. Die liest nämlich niemand:)`,
    };

    await transporter.sendMail(mailOptionsConfirmation);
  } catch (error) {
    return res.status(500).send({
      errors: [
        {
          location: "body",
          msg: "Failed to send confirmation email to sender",
          path: "",
          type: "field",
          value: "",
        },
      ],
    });
  }
    

    return res.status(200).json({ message: "Email sent successfully" });
  
}
