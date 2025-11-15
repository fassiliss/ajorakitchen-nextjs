import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        const { data, error } = await resend.emails.send({
            from: 'Ajora Kitchen <onboarding@resend.dev>',
            to: ['fassiliss@gmail.com'], // Your email
            replyTo: email, // Customer's email for easy reply
            subject: `Contact Form: ${subject}`,
            html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br />
        <p><em>Reply to this email to respond directly to the customer.</em></p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('Contact email sent successfully:', data);
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Catch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}