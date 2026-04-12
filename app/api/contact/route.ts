import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // For now, log the message. You can integrate with:
    // - Email service (Resend, SendGrid, Nodemailer)
    // - Database storage
    // - Slack/Discord webhook
    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json(
      { success: true, message: 'Message received! Thank you for reaching out.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
