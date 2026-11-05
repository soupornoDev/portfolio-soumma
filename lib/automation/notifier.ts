import nodemailer from "nodemailer";
import { NotificationResult } from "./types";

/**
 * Dispatch notification alerts to Telegram and/or Email when a new post is drafted.
 */
export async function sendAutomationNotification({
  title,
  editUrl,
  previewText,
  wordCount,
  labels,
  threadPermalink,
}: {
  title: string;
  editUrl: string;
  previewText: string;
  wordCount: number;
  labels: string[];
  threadPermalink?: string;
}): Promise<NotificationResult> {
  const result: NotificationResult = {
    telegram: { sent: false },
    email: { sent: false },
  };

  // 1. Telegram Notification
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (telegramBotToken && telegramChatId) {
    try {
      const tgText = `🚀 <b>New Blog Draft Created from Threads!</b>\n\n` +
        `📝 <b>Title:</b> ${escapeHtml(title)}\n` +
        `📊 <b>Word Count:</b> ~${wordCount} words\n` +
        `🏷️ <b>Labels:</b> ${labels.map((l) => `#${l.replace(/\s+/g, "")}`).join(" ")}\n\n` +
        `🔗 <b>Blogger Draft Editor:</b> <a href="${editUrl}">Open &amp; Review Draft</a>\n` +
        (threadPermalink ? `📱 <b>Source Thread:</b> <a href="${threadPermalink}">View Thread</a>\n\n` : "\n") +
        `📖 <b>Preview:</b>\n<i>${escapeHtml(previewText.slice(0, 320))}...</i>`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: "HTML",
            disable_web_page_preview: false,
          }),
        }
      );

      if (tgRes.ok) {
        result.telegram.sent = true;
      } else {
        const tgErr = await tgRes.text();
        result.telegram.error = `Telegram API returned status ${tgRes.status}: ${tgErr}`;
      }
    } catch (err: unknown) {
      result.telegram.error = err instanceof Error ? err.message : String(err);
    }
  } else {
    result.telegram.error = "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured (skipped).";
  }

  // 2. Email Notification (via Nodemailer)
  const smtpUser = process.env.SMTP_USER || "soummachakraborty.eng@gmail.com";
  const rawPass = process.env.SMTP_PASS;
  const smtpPass = rawPass ? rawPass.replace(/[\s-]+/g, "") : "";
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || smtpUser;

  if (smtpPass) {
    try {
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

      const isGmail = smtpHost.includes("gmail") || smtpUser.includes("@gmail.com");
      const transporter = isGmail
        ? nodemailer.createTransport({
            service: "gmail",
            auth: { user: smtpUser, pass: smtpPass },
          })
        : nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: { user: smtpUser, pass: smtpPass },
          });

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Blog Draft Created</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #0f172a; padding: 24px; color: #ffffff;">
      <span style="font-family: monospace; font-size: 11px; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Automation Dispatch</span>
      <h1 style="font-size: 20px; font-weight: 700; margin: 8px 0 0; color: #ffffff;">New Blogger Draft Created</h1>
    </div>
    <div style="padding: 24px;">
      <p style="font-size: 14px; margin-top: 0; color: #64748b;">A new long-form article has been drafted from your latest Thread post.</p>
      
      <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">${escapeHtml(title)}</div>
        <div style="font-size: 12px; font-family: monospace; color: #64748b; margin-bottom: 6px;">
          Length: ~${wordCount} words &bull; Labels: ${labels.join(", ")}
        </div>
        ${threadPermalink ? `<div style="font-size: 12px; font-family: monospace;"><a href="${threadPermalink}" style="color: #2563eb; text-decoration: none;">View Original Thread &rarr;</a></div>` : ""}
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${editUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px; display: inline-block;">
          Open &amp; Review in Blogger &rarr;
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 8px;">Preview Snippet</div>
        <div style="font-size: 13px; color: #475569; line-height: 1.6; font-style: italic;">
          ${escapeHtml(previewText.slice(0, 400))}...
        </div>
      </div>
    </div>
    <div style="background-color: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; font-family: monospace; color: #94a3b8; text-align: center;">
      Threads-to-Blogger Automation Pipeline &bull; Soumma Chakraborty
    </div>
  </div>
</body>
</html>`;

      await transporter.sendMail({
        from: `"Threads-to-Blogger Bot" <${smtpUser}>`,
        to: receiverEmail,
        subject: `[Blogger Automation] New Draft: ${title.slice(0, 50)}`,
        text: `New Blog Draft Created: ${title}\nWord Count: ~${wordCount}\nBlogger Draft Editor: ${editUrl}\n\nPreview:\n${previewText.slice(0, 300)}...`,
        html: emailHtml,
      });

      result.email.sent = true;
    } catch (err: unknown) {
      result.email.error = err instanceof Error ? err.message : String(err);
    }
  } else {
    result.email.error = "SMTP credentials (SMTP_PASS) not configured for email notification (skipped).";
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
