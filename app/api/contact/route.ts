import { NextRequest, NextResponse } from 'next/server'
import { profile } from '@/lib/data'

// Delivered via Resend (https://resend.com). Required env: RESEND_API_KEY.
// Optional: CONTACT_TO_EMAIL (defaults to profile.email), CONTACT_FROM_EMAIL
// (defaults to Resend's shared sender, which can only deliver to the address
// that owns the Resend account, so sign up with the inbox you want mail in).
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || profile.email
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 200, message: 5000 }

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: real users never see or fill this field.
  if (clean(body.company, 200)) {
    return NextResponse.json({ success: true })
  }

  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const message = clean(body.message, LIMITS.message)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set; message not delivered.')
    return NextResponse.json(
      { error: `The contact form is temporarily unavailable. Please email ${TO_EMAIL} directly.` },
      { status: 503 }
    )
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })

    if (!res.ok) {
      console.error('Contact form: Resend returned', res.status, await res.text())
      return NextResponse.json(
        { error: `Could not send your message. Please email ${TO_EMAIL} directly.` },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form: delivery failed', err)
    return NextResponse.json(
      { error: `Could not send your message. Please email ${TO_EMAIL} directly.` },
      { status: 502 }
    )
  }
}
