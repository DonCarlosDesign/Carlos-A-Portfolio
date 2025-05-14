import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.GMAIL_USER,
      subject: `[Portfolio] ${subject || 'New Message'}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      reply_to: email,
    });

    if (!response?.id) {
      return res.status(500).json({ error: 'Email send failed' });
    }

    return res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}
