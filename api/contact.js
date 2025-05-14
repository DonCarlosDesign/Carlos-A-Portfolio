// api/contact.js
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
    // Use test address in non-prod so Resend will always accept it
    const to = process.env.NODE_ENV === "production"
      ? RECIPIENT_EMAIL
      : "test@resend.dev";

    // Send and deconstruct the response
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <no-reply@resend.dev>",
      to,
      subject: `[Portfolio] ${subject}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      reply_to: email,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw new Error(error.message || "Resend API returned an error");
    }
    if (!data || !data.id) {
      console.error("❌ No ID in Resend data:", data);
      throw new Error("No confirmation ID from Resend");
    }

    return res.status(200).json({ message: "Sent", id: data.id });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ message: "Email send failed", error: err.message });
  }
};
