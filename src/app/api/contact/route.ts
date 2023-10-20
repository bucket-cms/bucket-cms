import { NextRequest, NextResponse } from "next/server"
import sendgrid from "@sendgrid/mail"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export async function POST(req: NextRequest): Promise<void | NextResponse> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({ message: "Bad configuration" }, { status: 500 })
    }
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

    if (req.method !== "POST") {
      return NextResponse.json({ message: "Method not allowed." }, { status: 405 })
    }

    const data = await req.json()

    const validationResult = ContactSchema.safeParse(data)
    if (!validationResult.success) {
      return NextResponse.json({ message: validationResult.error.message }, { status: 400 })
    }

    const { name, email, message } = validationResult.data

    const content = {
      to: process.env.CONTACT_EMAIL, // Replace with your email
      from: email, // Replace with the email you've set up on SendGrid
      subject: `Bucket CMS Contact from ${name}`,
      text: `${message} \n\nSent from: ${name} ${email}`,
    }

    await sendgrid.send(content)
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
  } catch (error: any) {
    console.log({ error })
    return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
  }
}
