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

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'Test Contact Form Submission',
    html: '<strong>This is a test email</strong>',
  });

  
    if (!data.id) {
      console.error('❌ No ID in Resend response:', data);
      return res.status(500).json({ error: 'Email send failed: No ID in response' });
    }
  
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Resend API Error:', err);
    res.status(500).json({ error: 'Email send failed' });
  }
  
}
