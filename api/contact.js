const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Create transporter using your sender Gmail credentials (set in Vercel env vars)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,       // e.g. yourname@gmail.com
      pass: process.env.SENDER_APP_PASSWORD, // Gmail App Password (not your login password)
    },
  });

  const mailOptions = {
    from: `"Imagine Technologies Website" <${process.env.SENDER_EMAIL}>`,
    to: 'acharan@theimaginetechnologies.com',
    replyTo: email,
    subject: `New Consultation Request from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563EB, #06B6D4); padding: 32px 36px;">
          <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New Consultation Request</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">Submitted via theimaginetechnologies.com</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 36px; background: #ffffff;">
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; width: 35%;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Full Name</span>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 15px; color: #0f172a; font-weight: 500;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Company</span>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 15px; color: #0f172a;">${company || '—'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Email</span>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${email}" style="font-size: 15px; color: #2563EB; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Phone</span>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 15px; color: #0f172a;">${phone || '—'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Service</span>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 15px; color: #0f172a; font-weight: 600; color: #2563EB;">${service || '—'}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <div style="margin-top: 24px;">
            <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin: 0 0 10px;">Project Description</p>
            <div style="background: #f8faff; border-left: 3px solid #06B6D4; border-radius: 0 8px 8px 0; padding: 16px 20px;">
              <p style="font-size: 15px; color: #0f172a; line-height: 1.7; margin: 0;">${message || 'No description provided.'}</p>
            </div>
          </div>

          <!-- Reply CTA -->
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your Consultation Request - Imagine Technologies" 
               style="display: inline-block; background: linear-gradient(135deg, #2563EB, #06B6D4); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">
              Reply to ${name} →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 36px; background: #f8faff; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">'The Imagine Technologies · theimaginetechnologies.com</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Your message has been sent! We will be in touch shortly.' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
