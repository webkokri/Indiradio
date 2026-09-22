import nodemailer from 'nodemailer'
import { sanityWriteClient } from '../lib/sanityWriteClient.js'
import { applyCors } from '../lib/cors.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendNotificationEmail({ name, email, subject, message }) {
  if (!process.env.SMTP_HOST) return // Email notifications are optional.

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `[Indi Radio Contact] ${subject || 'New message'}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Please provide a valid email address.' })
    return
  }

  try {
    await sanityWriteClient.create({
      _type: 'contactSubmission',
      name,
      email,
      subject: subject || '',
      message,
      submittedAt: new Date().toISOString(),
    })

    await sendNotificationEmail({ name, email, subject, message })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
}
