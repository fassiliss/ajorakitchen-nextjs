import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/emailHtml";

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
    const { name, email, phone, date, time, guests } = body as {
      name: string;
      email: string;
      phone: string;
      date: string;
      time: string;
      guests: string;
    };

    const { data, error } = await resend.emails.send({
      from: "Ajora Kitchen <onboarding@resend.dev>",
      to: ["fassiliss@gmail.com"],
      replyTo: email,
      subject: `New Reservation: ${name} - ${date} at ${time}`,
      html: `
        <h2>New Reservation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Time:</strong> ${escapeHtml(time)}</p>
        <p><strong>Guests:</strong> ${escapeHtml(guests)}</p>
        <br />
        <p>Please contact the customer to confirm the reservation.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Reservation email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
