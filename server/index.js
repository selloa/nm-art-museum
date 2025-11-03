import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Validate environment variables
const requiredEnvVars = ['RECIPIENT_EMAIL', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0 && process.env.NODE_ENV !== 'production') {
  console.warn(`Warning: Missing environment variables: ${missingVars.join(', ')}`);
}

// API endpoint to send interest email
app.post('/api/send-interest', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email address is required' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if required environment variables are set
    if (!process.env.RECIPIENT_EMAIL) {
      console.error('RECIPIENT_EMAIL is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Neue Interessensbekundung',
      text: `Neue E-Mail-Adresse von Interessent:\n\n${email}`,
      html: `<p>Neue E-Mail-Adresse von Interessent:</p><p><strong>${email}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  // Catch-all handler for SPA routing (must be last)
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

