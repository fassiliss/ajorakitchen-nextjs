import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, textOrFallback } from "@/lib/emailHtml";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not set" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      event_date,
      location,
      number_of_guests,
      food_selections,
    } = body as {
      first_name: string;
      last_name: string;
      email: string;
      event_date?: string;
      location?: string;
      number_of_guests?: string;
      food_selections: string;
    };

    const { data, error } = await resend.emails.send({
      from: "Ajora Kitchen <onboarding@resend.dev>",
      to: ["fassiliss@gmail.com"],
      replyTo: email,
      subject: `New Catering Request from ${first_name} ${last_name}`,
      html: `
        <h2>New Catering Request</h2>

        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${escapeHtml(first_name)} ${escapeHtml(last_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>

        <h3>Event Details:</h3>
        <p><strong>Event Date:</strong> ${textOrFallback(event_date)}</p>
        <p><strong>Location:</strong> ${textOrFallback(location)}</p>
        <p><strong>Number of Guests:</strong> ${textOrFallback(number_of_guests)}</p>

        <h3>Food Selections / Special Requests:</h3>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="white-space: pre-wrap;">${escapeHtml(food_selections)}</p>
        </div>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

        <p><em>Please contact the customer to discuss pricing and availability.</em></p>
        <p><em>Reply to this email to respond directly to ${escapeHtml(first_name)}.</em></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Catering email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
