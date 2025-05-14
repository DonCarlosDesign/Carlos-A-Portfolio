console.log("API /contact triggered");

import { Resend } from "resend";

// Validate environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.GMAIL_USER;

if (!RESEND_API_KEY || !RECIPIENT_EMAIL) {
  console.error("Missing required environment variables");
  throw new Error("Missing required environment variables");
}

const resend = new Resend(RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      reply_to: email
    });

    console.log("Resend response:", data);
    return res.status(200).json({ message: "Message sent successfully", data });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ 
      message: "Failed to send email", 
      error: process.env.NODE_ENV === 'development' ? err.toString() : 'Internal server error'
    });
  }
}
