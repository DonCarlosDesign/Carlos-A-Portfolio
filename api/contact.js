import resend from "resend"; // Import Resend

// Set up Resend client with your API key
const client = resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await client.send({
      from: `${name} <${email}>`,
      to: process.env.GMAIL_USER,  // You can still send it to your Gmail if you'd like
      subject: "Portfolio Contact Form Submission",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Email failed to send", error: err.toString() });
  }
}
