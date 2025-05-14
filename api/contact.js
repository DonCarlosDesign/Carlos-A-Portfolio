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


const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'test@resend.dev', // Replace with a Resend testing address if needed
      subject: `New contact from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
