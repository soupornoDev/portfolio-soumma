/**
 * Automation Workflow Type Definitions
 * Threads -> Gemini AI -> Blogger API v3 -> Telegram/Email Notifications
 */

export interface ThreadPostData {
  id: string;
  text: string;
  timestamp?: string;
  permalink?: string;
  mediaUrls: string[];
}

export interface DownloadedMedia {
  url: string;
  buffer: Buffer;
  base64: string;
  mimeType: string;
  filename: string;
}

export interface GeneratedBlogArticle {
  title: string;
  content_html: string;
  meta_description: string;
  labels: string[];
  slug: string;
  wordCount: number;
}

export interface BloggerPostResult {
  id: string;
  title: string;
  url?: string;
  editUrl: string;
  status: "DRAFT" | "LIVE";
  published?: string;
  updated?: string;
}

export interface NotificationResult {
  telegram: { sent: boolean; error?: string };
  email: { sent: boolean; error?: string };
}

export interface AutomationRunLog {
  id: string;
  timestamp: string;
  threadId?: string;
  status: "SUCCESS" | "SKIPPED" | "ERROR";
  reason?: string;
  postTitle?: string;
  bloggerPostId?: string;
  bloggerEditUrl?: string;
  wordCount?: number;
  error?: string;
}
