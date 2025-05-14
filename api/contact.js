// pages/api/contact.js
import { Resend } from "resend";

export default async function handler(req, res) {
  // Always return JSON
  res.setHeader("Content-Type", "application/json");

  const { RESEND_API_KEY, GMAIL_USER } = process.env;
  if (!RESEND_API_KEY || !GMAIL_USER) {
    console.error("❌ Missing RESEND_API_KEY or GMAIL_USER");
    return res
      .status(500)
      .json({ error: "Server misconfiguration: missing env vars" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("📬 Received body:", req.body);

  const { name, email, subject, message } = req.body || {};
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

  const resend = new Resend(RESEND_API_KEY);

  try {
    const sent = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to:   GMAIL_USER,
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
      console.error("❌ No ID in Resend response");
      return res.status(500).json({ error: "Email send failed" });
    }

    return res.status(200).json({ success: true, id: sent.id });
  } catch (err) {
    console.error("🔥 Resend API error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Unknown server error" });
  }
}
