import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Strict input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid corporate or professional email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide detailed project requirements (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const transmissionId = `TX-${Date.now().toString().slice(-6)}`;
    const inquirySubject = subject?.trim() || "New Mechanical / CNC Design Inquiry";

    // SMTP configuration from environment variables (.env.local)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "soummachakraborty.eng@gmail.com";

    // If SMTP credentials are configured, dispatch real email via nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`,
        replyTo: email,
        to: receiverEmail,
        subject: `[Portfolio Inquiry] ${inquirySubject} (${transmissionId})`,
        text: `New engineering inquiry received from portfolio:\n\nSender Name: ${name}\nSender Email: ${email}\nSubject: ${inquirySubject}\nReference Code: ${transmissionId}\n\nMessage:\n${message}\n\n---\nTransmitted via Soumma Chakraborty Engineering Portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f172a; color: #ffffff; padding: 18px 24px;">
              <h2 style="margin: 0; font-size: 18px; letter-spacing: 0.5px;">New Engineering Inquiry Received</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #38bdf8; font-family: monospace;">REFERENCE: ${transmissionId}</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;"><strong>Client Name:</strong></td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Client Email:</strong></td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Inquiry Scope:</strong></td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">${inquirySubject}</td>
                </tr>
              </table>

              <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; color: #334155; white-space: pre-wrap;">${message}</p>
              </div>

              <p style="font-size: 12px; color: #94a3b8; margin: 0; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                Direct reply to this email will deliver to ${email}.
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email dispatched successfully to ${receiverEmail} (${transmissionId})`);
    } else {
      console.log(
        `SMTP credentials pending in .env.local; logged inquiry locally: ${transmissionId} from ${email}`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your engineering inquiry has been transmitted successfully to Soumma Chakraborty.",
        transmissionId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API email transmission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to dispatch email inquiry. Please reach out directly to soummachakraborty.eng@gmail.com.",
      },
      { status: 500 }
    );
  }
}
