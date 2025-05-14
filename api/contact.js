// api/contact.js

// 1. Pull in Resend the CommonJS way
const { Resend } = require("resend");

// 2. Grab your env-vars
const RESEND_API_KEY    = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL   = process.env.GMAIL_USER;

if (!RESEND_API_KEY || !RECIPIENT_EMAIL) {
  console.error("Missing required environment variables");
  throw new Error("Missing required environment variables");
}

const resend = new Resend(RESEND_API_KEY);

// 3. Helper to retry on rate-limit
async function sendWithRetry(payload, tries = 3) {
  try {
    const { data, error } = await resend.emails.send(payload);
    if (error) throw error;
    return data;
  } catch (err) {
    if (err.name === "rate_limit_exceeded" && tries > 1) {
      // back off half a second then retry
      await new Promise(r => setTimeout(r, 500));
      return sendWithRetry(payload, tries - 1);
    }
    throw err;
  }
}

// 4. Your handler
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // parse & validate
  const { name, email, subject, message } = req.body;
  const missing = [];
  if (!name)    missing.push("name");
  if (!email)   missing.push("email");
  if (!subject) missing.push("subject");
  if (!message) missing.push("message");

  if (missing.length) {
    return res.status(400).json({
      message: "Missing required fields",
      error:   `Missing: ${missing.join(", ")}`,
    });
  }

  try {
    const to = process.env.NODE_ENV === "production"
      ? RECIPIENT_EMAIL
      : "test@resend.dev";

    const data = await sendWithRetry({
      from:     "Portfolio Contact <no-reply@resend.dev>",
      to,
      subject:  `[Portfolio] ${subject}`,
      text:     message,
      html:     `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong><br/>${message}</p>`,
      reply_to: email,
    });

    if (!data.id) throw new Error("No confirmation ID from Resend");
    return res.status(200).json({ message: "Sent", id: data.id });

  } catch (err) {
    console.error("Email send failed:", err);
    const status = err.name === "rate_limit_exceeded" ? 429 : 500;
    return res.status(status).json({ message: err.message });
  }
};
