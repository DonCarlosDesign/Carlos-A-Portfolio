const { Resend } = require("resend");

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.GMAIL_USER;

if (!RESEND_API_KEY || !RECIPIENT_EMAIL) {
  console.error("Missing required environment variables");
  throw new Error("Missing required environment variables");
}

const resend = new Resend(RESEND_API_KEY);

// Rate limiting
const rateLimiter = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimiter.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);
  return true;
}

// Security helpers
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateAndSanitize(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, maxLength);
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.length <= 254 && email.length >= 5;
}

async function sendWithRetry(payload, tries = 3) {
  try {
    const { data, error } = await resend.emails.send(payload);
    if (error) throw error;
    return data;
  } catch (err) {
    if (err.name === "rate_limit_exceeded" && tries > 1) {
      await new Promise(r => setTimeout(r, 500));
      return sendWithRetry(payload, tries - 1);
    }
    throw err;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ 
      message: "Too many requests. Please wait before sending another message." 
    });
  }

  // Sanitize inputs
  let { name, email, subject, message } = req.body;
  name = validateAndSanitize(name, 100);
  email = validateAndSanitize(email, 254);
  subject = validateAndSanitize(subject, 200);
  message = validateAndSanitize(message, 2000);

  // Validate
  const errors = [];
  if (!name || name.length < 2) errors.push("Name must be at least 2 characters");
  if (!email || !isValidEmail(email)) errors.push("Valid email required");
  if (!subject) errors.push("Subject required");
  if (!message || message.length < 10) errors.push("Message must be at least 10 characters");

  if (errors.length) {
    return res.status(400).json({
      message: "Validation failed", 
      errors: errors
    });
  }

  try {
    const to = process.env.NODE_ENV === "production" ? RECIPIENT_EMAIL : "test@resend.dev";

    const data = await sendWithRetry({
      from: "Portfolio Contact <no-reply@resend.dev>",
      to,
      subject: `[Portfolio] ${escapeHtml(subject)}`,
      text: message,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      reply_to: email,
    });

    if (!data.id) throw new Error("No confirmation ID from Resend");
    
    // Log successful submission (for monitoring)
    console.log(`Contact form submitted from ${clientIP} - ID: ${data.id}`);
    
    return res.status(200).json({ message: "Sent", id: data.id });

  } catch (err) {
    console.error("Email send failed:", err);
    const status = err.name === "rate_limit_exceeded" ? 429 : 500;
    return res.status(status).json({ message: err.message });
  }
};