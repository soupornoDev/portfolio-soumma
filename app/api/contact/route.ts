import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Helper to reliably retrieve environment variables from memory or disk (.env.local)
function getEnv(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
      if (match) {
        return match[1].trim().replace(/^['"]|['"]$/g, "");
      }
    }
  } catch (err) {
    console.warn("Could not read .env.local fallback:", err);
  }
  return undefined;
}

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

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter your message (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const transmissionId = `TX-${Date.now().toString().slice(-6)}`;
    const inquirySubject = subject?.trim() || "New Mechanical / CNC Design Inquiry";

    // SMTP configuration from environment or .env.local
    const smtpHost = getEnv("SMTP_HOST") || "smtp.gmail.com";
    const smtpPort = parseInt(getEnv("SMTP_PORT") || "465", 10);
    const smtpSecure = getEnv("SMTP_SECURE") === "true" || smtpPort === 465;
    const smtpUser = getEnv("SMTP_USER") || "soummachakraborty.eng@gmail.com";
    const rawPass = getEnv("SMTP_PASS");
    const smtpPass = rawPass ? rawPass.replace(/[\s-]+/g, "") : "";
    const receiverEmail = getEnv("CONTACT_RECEIVER_EMAIL") || "soummachakraborty.eng@gmail.com";

    if (!smtpPass) {
      console.error("SMTP_PASS not found in process.env or .env.local");
      return NextResponse.json(
        {
          success: false,
          error: "Email transmission service is unconfigured. Please email soummachakraborty.eng@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    const isGmail = smtpHost.includes("gmail") || smtpUser.includes("@gmail.com");
    const transporter = isGmail
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

    const cleanSenderName = name.replace(/["'\r\n]/g, "").trim();
    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const mailOptions = {
      from: `"${cleanSenderName} via Portfolio" <${smtpUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `[Engineering Dispatch] ${inquirySubject} • ${cleanSenderName} (${transmissionId})`,
      text:
        `NEW ENGINEERING INQUIRY RECEIVED\n` +
        `============================================================\n` +
        `Reference ID : ${transmissionId}\n` +
        `Received     : ${formattedDate} (IST)\n` +
        `Sender Name  : ${cleanSenderName}\n` +
        `Sender Email : ${email}\n` +
        `Subject      : ${inquirySubject}\n\n` +
        `CLIENT SPECIFICATION / MESSAGE:\n` +
        `------------------------------------------------------------\n` +
        `${message}\n` +
        `------------------------------------------------------------\n\n` +
        `Direct Reply : mailto:${email}\n` +
        `Portfolio    : Soumma Chakraborty | CNC Machine Design & Precision Mechanical Engineering\n`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Engineering Inquiry - ${transmissionId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Technical Brand Bar -->
          <tr>
            <td style="background-color: #090d16; padding: 24px 28px; border-bottom: 3px solid #0284c7;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family: 'SF Pro Display', -apple-system, monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #38bdf8; font-weight: 700; margin-bottom: 4px;">
                      ⚙ ENGINEERING DISPATCH NOTIFICATION
                    </div>
                    <div style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;">
                      Soumma Chakraborty
                    </div>
                    <div style="font-size: 12px; color: #94a3b8; font-family: monospace; margin-top: 2px;">
                      Mechanical Engineer • CNC Machine Design &amp; Architecture
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="display: inline-block; background-color: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; padding: 4px 10px; border-radius: 4px; font-family: monospace; font-size: 11px; font-weight: 700;">
                      ${transmissionId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Status Indicator Pill -->
          <tr>
            <td style="background-color: #f8fafc; padding: 12px 28px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-family: monospace; color: #475569;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 6px;"></span>
                    <strong style="color: #0f172a;">STATUS:</strong> Production Transmission Confirmed
                  </td>
                  <td align="right" style="color: #64748b;">
                    ${formattedDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Metadata Table -->
          <tr>
            <td style="padding: 24px 28px 16px 28px;">
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
                // Sender Identification &amp; Scope
              </div>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; width: 130px; font-size: 12px; font-family: monospace; color: #64748b; font-weight: 600;">
                    CLIENT NAME
                  </td>
                  <td style="padding: 8px 16px; font-size: 14px; color: #0f172a; font-weight: 700;">
                    ${cleanSenderName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; font-family: monospace; color: #64748b; font-weight: 600;">
                    EMAIL ADDRESS
                  </td>
                  <td style="padding: 8px 16px; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; font-family: monospace; color: #64748b; font-weight: 600;">
                    INQUIRY SCOPE
                  </td>
                  <td style="padding: 8px 16px; font-size: 14px; color: #0f172a; font-weight: 600;">
                    ${inquirySubject}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 8px 28px 24px 28px;">
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700; margin-bottom: 8px;">
                // Engineering Specification &amp; Message Detail:
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7; border-radius: 8px; padding: 20px 22px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; font-family: inherit;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 6px; background-color: #0f172a;">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(inquirySubject)}%20(${transmissionId})" target="_blank" style="display: inline-block; padding: 12px 24px; font-family: monospace; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 6px; letter-spacing: 0.5px;">
                      REPLY DIRECTLY TO ${cleanSenderName.toUpperCase()} &rarr;
                    </a>
                  </td>
                  <td style="padding-left: 12px;">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=Re:%20${encodeURIComponent(inquirySubject)}" target="_blank" style="display: inline-block; padding: 12px 20px; font-family: monospace; font-size: 12px; font-weight: 600; color: #475569; text-decoration: none; border: 1px solid #cbd5e1; border-radius: 6px; background-color: #ffffff;">
                      Open in Gmail Compose
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Engineering Title Block Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-family: monospace; font-size: 11px; color: #64748b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <strong>SYSTEM SPEC:</strong> ISO 2768-m Precision Standard<br>
                    <strong>TRANSMISSION:</strong> TLS 1.3 End-to-End Encrypted via Gmail SMTP
                  </td>
                  <td align="right" style="vertical-align: bottom;">
                    <span style="color: #0284c7; font-weight: 700;">Soumma Chakraborty</span> Portfolio
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 12px; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; margin-top: 12px;">
                    © 2026 Soumma Chakraborty. All Mechanical Design &amp; CNC Architecture Rights Reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email dispatched successfully to ${receiverEmail}: ${info.messageId} (${transmissionId})`);

    return NextResponse.json(
      {
        success: true,
        message: "Your engineering inquiry has been transmitted successfully to Soumma Chakraborty.",
        transmissionId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Contact API email transmission error:", error);
    const errMessage = error instanceof Error ? error.message : "Internal transmission failure";
    return NextResponse.json(
      {
        success: false,
        error: `Failed to dispatch email inquiry: ${errMessage}. Please reach out directly to soummachakraborty.eng@gmail.com.`,
      },
      { status: 500 }
    );
  }
}
