// pages/api/contact.js
import { Resend } from "resend";

// validate env vars at startup
const { RESEND_API_KEY, GMAIL_USER } = process.env;
if (!RESEND_API_KEY || !GMAIL_USER) {
  console.error("❌ Missing RESEND_API_KEY or GMAIL_USER");
  throw new Error("Missing required environment variables");
}

const resend = new Resend(RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("📬 /api/contact hit with method:", req.method);
  console.log("📥 body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;
  const missing = [];
  if (!name)    missing.push("name");
  if (!email)   missing.push("email");
  if (!message) missing.push("message");
  if (missing.length) {
    console.error("❌ Missing fields:", missing);
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(", ")}` });
  }

  try {
    const sent = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: GMAIL_USER,
      subject: `[Portfolio] ${subject || "New Message"}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      reply_to: email,
    });

    console.log("✅ Resend response:", sent);

    if (!sent?.id) {
      console.error("❌ No ID in Resend response:", sent);
      return res.status(500).json({ error: "Email failed (no ID returned)" });
    }

    return res.status(200).json({ success: true, id: sent.id });
  } catch (err) {
    console.error("🔥 Resend API error stack:", err);
    // always return JSON
    return res
      .status(500)
      .json({ error: err.message || "Unknown server error" });
  }
}
