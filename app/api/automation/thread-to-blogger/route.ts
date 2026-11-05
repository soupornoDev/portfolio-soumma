import { NextRequest, NextResponse } from "next/server";
import { getLatestThreadPost } from "@/lib/automation/threads";
import { downloadThreadMedia } from "@/lib/automation/media";
import { generateBlogFromThread } from "@/lib/automation/gemini";
import { createBloggerPost } from "@/lib/automation/blogger";
import { sendAutomationNotification } from "@/lib/automation/notifier";
import { recordAutomationLog, getAutomationLogs } from "@/lib/automation/logger";

export const maxDuration = 60; // Allow up to 60s for AI generation and image fetching

/**
 * Security validation: Checks optional secret token from header or query param
 */
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.AUTOMATION_SECRET_TOKEN || process.env.CRON_SECRET;
  if (!secret) return true; // Open if no secret is enforced

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace(/^Bearer\s+/i, "").trim() === secret.trim()) {
    return true;
  }

  const querySecret = req.nextUrl.searchParams.get("secret");
  if (querySecret && querySecret.trim() === secret.trim()) {
    return true;
  }

  return false;
}

/**
 * GET: Health check, environment configuration audit, and recent automation logs
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const configStatus = {
    threadsConfigured: Boolean(process.env.THREADS_ACCESS_TOKEN),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    geminiModel: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    bloggerConfigured: Boolean(process.env.BLOGGER_BLOG_ID),
    bloggerOAuth: Boolean(process.env.BLOGGER_ACCESS_TOKEN || process.env.GOOGLE_REFRESH_TOKEN),
    telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    emailConfigured: Boolean(process.env.SMTP_PASS),
    automationSecretSet: Boolean(process.env.AUTOMATION_SECRET_TOKEN || process.env.CRON_SECRET),
  };

  const logs = getAutomationLogs();

  return NextResponse.json({
    status: "READY",
    service: "Threads to Blogger Automation Pipeline",
    targetAccount: "@_s_o_u_m_m_a_",
    config: configStatus,
    recentRunsCount: logs.length,
    recentRuns: logs.slice(0, 10),
  });
}

/**
 * POST: Execute the Threads -> Gemini -> Blogger -> Notification Pipeline
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  let requestBody: Record<string, unknown> = {};
  try {
    requestBody = (await req.json()) as Record<string, unknown>;
  } catch {
    // Empty body is valid: triggers fetching latest live Thread
    requestBody = {};
  }

  try {
    // STEP 1: Get Thread Post (from payload or Threads Graph API)
    const { post, error: threadError } = await getLatestThreadPost(requestBody);

    if (threadError || !post) {
      recordAutomationLog({
        status: "ERROR",
        error: threadError || "No thread post available",
      });
      return NextResponse.json(
        {
          success: false,
          status: "ERROR",
          error: threadError || "Could not retrieve thread post",
        },
        { status: 400 }
      );
    }

    // STEP 1.1: Guard - Skip if Thread is under 50 characters
    if (post.text.trim().length < 50) {
      const skipLog = recordAutomationLog({
        threadId: post.id,
        status: "SKIPPED",
        reason: `Thread text (${post.text.trim().length} chars) is under the 50 characters threshold.`,
      });

      return NextResponse.json({
        success: true,
        status: "SKIPPED",
        threadId: post.id,
        reason: `Thread post is only ${post.text.trim().length} characters (minimum 50 required for full blog expansion).`,
        logId: skipLog.id,
      });
    }

    // STEP 2: Fetch Attached Media (pictures/videos)
    const media = await downloadThreadMedia(post.mediaUrls);

    // STEP 3: AI Processing with Gemini
    const article = await generateBlogFromThread(post.text, media);

    // STEP 4 & 5: Upload/Embed Media & Create Blogger Post (Draft by default)
    const publishLive = Boolean(requestBody.publishLive || req.nextUrl.searchParams.get("publish") === "true");

    const bloggerResult = await createBloggerPost({
      title: article.title,
      contentHtml: article.content_html,
      labels: article.labels,
      metaDescription: article.meta_description,
      media,
      publishLive,
    });

    // STEP 6: Send Notifications (Telegram & Email)
    const previewText = article.content_html.replace(/<[^>]+>/g, " ").slice(0, 400);

    const notificationResult = await sendAutomationNotification({
      title: article.title,
      editUrl: bloggerResult.editUrl,
      previewText,
      wordCount: article.wordCount,
      labels: article.labels,
      threadPermalink: post.permalink,
    });

    // Record Success Log
    const runLog = recordAutomationLog({
      threadId: post.id,
      status: "SUCCESS",
      postTitle: article.title,
      bloggerPostId: bloggerResult.id,
      bloggerEditUrl: bloggerResult.editUrl,
      wordCount: article.wordCount,
    });

    return NextResponse.json({
      success: true,
      status: "SUCCESS",
      durationMs: Date.now() - startTime,
      logId: runLog.id,
      thread: {
        id: post.id,
        permalink: post.permalink,
        mediaCount: media.length,
      },
      article: {
        title: article.title,
        wordCount: article.wordCount,
        labels: article.labels,
        metaDescription: article.meta_description,
        slug: article.slug,
      },
      blogger: {
        id: bloggerResult.id,
        status: bloggerResult.status,
        editUrl: bloggerResult.editUrl,
        liveUrl: bloggerResult.url || null,
      },
      notifications: notificationResult,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Automation Pipeline Error]:", err);

    recordAutomationLog({
      status: "ERROR",
      error: errorMsg,
    });

    return NextResponse.json(
      {
        success: false,
        status: "ERROR",
        error: errorMsg,
        durationMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
