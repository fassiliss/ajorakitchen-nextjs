import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, date, time, guests } = body;

        console.log('Attempting to send email with data:', { name, email, phone, date, time, guests });

        const { data, error } = await resend.emails.send({
            from: 'Ajora Kitchen <onboarding@resend.dev>',
            to: ['fassiliss@gmail.com'],
            subject: `New Reservation: ${name} - ${date} at ${time}`,
            html: `
        <h2>New Reservation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <br />
        <p>Please contact the customer to confirm the reservation.</p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Catch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}