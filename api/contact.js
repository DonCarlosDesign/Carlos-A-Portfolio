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
    return res.status(405).json({
      message: "Method Not Allowed",
      error: `Method ${req.method} is not supported`,
    });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!subject) missingFields.push("subject");
  if (!message) missingFields.push("message");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      error: `Required fields missing: ${missingFields.join(", ")}`,
    });
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Use Resend default sender
      to: RECIPIENT_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      reply_to: email, // Reply-To header
    });

    console.log("Resend response:", data);

    if (!data || !data.id) {
      throw new Error("No confirmation ID received from Resend");
    }

    return res.status(200).json({
      message: "Message sent successfully",
      data: {
        id: data.id,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (emailError) {
    console.error("Resend API error:", emailError);
    return res.status(500).json({
      message: "Failed to send email",
      error:
        process.env.NODE_ENV === "development"
          ? emailError.message || emailError.toString()
          : "Email service error",
    });
  }
}
    