// api/contact.js

// use require instead of import
const { Resend } = require("resend");

// grab your env vars
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.GMAIL_USER;

if (!RESEND_API_KEY || !RECIPIENT_EMAIL) {
  console.error("Missing required environment variables");
  throw new Error("Missing required environment variables");
}

const resend = new Resend(RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;
  const missing = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!subject) missing.push("subject");
  if (!message) missing.push("message");
  if (missing.length) {
    return res.status(400).json({
      message: "Missing required fields",
      error: `Missing: ${missing.join(", ")}`,
    });
  }

  try {
    // for test mode you can send to test@resend.dev
    const to = process.env.NODE_ENV === "production"
      ? RECIPIENT_EMAIL
      : "test@resend.dev";

    const result = await resend.emails.send({
      from: "Portfolio Contact <no-reply@resend.dev>",
      to,
      subject: `[Portfolio] ${subject}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email,
    });

    if (!result || !result.id) {
      console.error("❌ No ID in Resend response:", result);
      throw new Error("No confirmation ID from Resend");
    }

    return res.status(200).json({ message: "Sent", id: result.id });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ message: "Email send failed", error: err.message });
  }
};
