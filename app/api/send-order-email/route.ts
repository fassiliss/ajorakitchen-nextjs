import { Resend } from "resend";
import { NextResponse } from "next/server";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Prevent build-time crash + give clear runtime error
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not set" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      items,
      total_amount,
    } = body as {
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      customer_address: string;
      items: OrderItem[];
      total_amount: number;
    };

    const itemsHTML = (items || [])
      .map(
        (item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${Number(item.price).toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
          </tr>
        `,
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "Ajora Kitchen <onboarding@resend.dev>",
      to: ["fassiliss@gmail.com"],
      replyTo: customer_email,
      subject: `New Order from ${customer_name} - $${Number(total_amount).toFixed(2)}`,
      html: `
        <h2>🍽️ New Online Order!</h2>

        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${customer_name}</p>
        <p><strong>Email:</strong> ${customer_email}</p>
        <p><strong>Phone:</strong> ${customer_phone}</p>
        <p><strong>Delivery Address:</strong><br>${customer_address}</p>

        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
          <tfoot>
            <tr style="background-color: #fee2e2;">
              <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold;">TOTAL:</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; color: #dc2626;">
                $${Number(total_amount).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <p><em>Please contact the customer to confirm the order and arrange delivery.</em></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Catch error:", error);
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
