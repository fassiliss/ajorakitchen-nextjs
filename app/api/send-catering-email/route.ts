import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { first_name, last_name, email, event_date, location, number_of_guests, food_selections } = body;

        const { data, error } = await resend.emails.send({
            from: 'Ajora Kitchen <onboarding@resend.dev>',
            to: ['fassiliss@gmail.com'], // Restaurant email
            replyTo: email,
            subject: `New Catering Request from ${first_name} ${last_name}`,
            html: `
        <h2>🎉 New Catering Request!</h2>
        
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${first_name} ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <h3>Event Details:</h3>
        <p><strong>Event Date:</strong> ${event_date || 'Not specified'}</p>
        <p><strong>Location:</strong> ${location || 'Not specified'}</p>
        <p><strong>Number of Guests:</strong> ${number_of_guests || 'Not specified'}</p>
        
        <h3>Food Selections / Special Requests:</h3>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="white-space: pre-wrap;">${food_selections}</p>
        </div>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        
        <p><em>Please contact the customer to discuss pricing and availability.</em></p>
        <p><em>Reply to this email to respond directly to ${first_name}.</em></p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('Catering email sent successfully:', data);
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Catch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}