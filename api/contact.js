console.log("API /contact triggered");


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "doncarlosdesign@gmail.com", // Hardcoded for now
      subject: "New Contact Form Submission",
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });

    console.log("Email send response:", response);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ message: "Email failed to send", error: err.message });
  }
}
