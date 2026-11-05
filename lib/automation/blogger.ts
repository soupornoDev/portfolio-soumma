import { DownloadedMedia, BloggerPostResult } from "./types";

/**
 * Blogger API v3 Client
 * Manages image embedding and creates draft or published blog posts.
 */

// Helper to obtain a valid Google OAuth2 access token if refresh token is provided
async function getGoogleAccessToken(): Promise<string | null> {
  // 1. Direct Bearer token from environment
  if (process.env.BLOGGER_ACCESS_TOKEN?.trim()) {
    return process.env.BLOGGER_ACCESS_TOKEN.trim();
  }

  // 2. Automatic refresh via OAuth2 refresh token if configured
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

  if (clientId && clientSecret && refreshToken) {
    try {
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });

      if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        return tokenData.access_token;
      } else {
        const err = await tokenRes.text();
        console.warn(`[Blogger Auth] Failed to refresh token: ${err}`);
      }
    } catch (e) {
      console.warn(`[Blogger Auth] Refresh token request failed:`, e);
    }
  }

  return null;
}

/**
 * Replace [IMAGE_1], [IMAGE_2] placeholders in content_html with responsive HTML <img> blocks
 */
export function injectImagesIntoHtml(
  contentHtml: string,
  media: DownloadedMedia[],
  postTitle: string
): string {
  let updatedHtml = contentHtml;

  for (let i = 0; i < media.length; i++) {
    const item = media[i];
    const placeholder = `[IMAGE_${i + 1}]`;
    const imageTag = `
<div class="separator" style="clear: both; text-align: center; margin: 28px auto; max-width: 800px;">
  <a href="${item.url}" style="margin-left: 1em; margin-right: 1em;" target="_blank" rel="noopener noreferrer">
    <img border="0" data-original-height="800" data-original-width="1200" src="${item.url}" alt="${postTitle} - Technical Diagram ${i + 1}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: block; margin: 0 auto;" />
  </a>
  <span style="font-size: 13px; color: #64748b; font-style: italic; display: block; margin-top: 8px;">Figure ${i + 1}: ${postTitle} illustration</span>
</div>`;

    if (updatedHtml.includes(placeholder)) {
      updatedHtml = updatedHtml.split(placeholder).join(imageTag);
    } else {
      // If placeholder wasn't inserted by AI, append to the end of the post
      updatedHtml += imageTag;
    }
  }

  // Clean up any remaining unreferenced placeholders
  updatedHtml = updatedHtml.replace(/\[IMAGE_\d+\]/g, "");

  return updatedHtml;
}

/**
 * Create a new post on Blogger via Blogger API v3
 */
export async function createBloggerPost({
  title,
  contentHtml,
  labels,
  metaDescription,
  media = [],
  publishLive = false,
}: {
  title: string;
  contentHtml: string;
  labels: string[];
  metaDescription?: string;
  media?: DownloadedMedia[];
  publishLive?: boolean;
}): Promise<BloggerPostResult> {
  const blogId = process.env.BLOGGER_BLOG_ID?.trim();
  const apiKey = process.env.BLOGGER_API_KEY?.trim();

  if (!blogId) {
    throw new Error("BLOGGER_BLOG_ID is not configured in environment variables.");
  }

  const finalHtml = injectImagesIntoHtml(contentHtml, media, title);
  const isDraft = !publishLive;

  // Obtain authorization
  const accessToken = await getGoogleAccessToken();

  let endpoint = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/?isDraft=${isDraft}`;
  if (apiKey) {
    endpoint += `&key=${apiKey}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const payload: Record<string, unknown> = {
    kind: "blogger#post",
    title,
    content: finalHtml,
    labels: labels && labels.length > 0 ? labels : ["Engineering", "CNC Design"],
  };

  if (metaDescription) {
    payload.customMetaData = metaDescription;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Blogger API error (${response.status}): ${errorBody}. Check BLOGGER_BLOG_ID and ensure your Google OAuth token has 'https://www.googleapis.com/auth/blogger' scope.`
    );
  }

  const postData = await response.json();
  const postId = postData.id;
  const editUrl = `https://www.blogger.com/blog/post/edit/${blogId}/${postId}`;

  return {
    id: postId,
    title: postData.title || title,
    url: postData.url,
    editUrl,
    status: isDraft ? "DRAFT" : "LIVE",
    published: postData.published,
    updated: postData.updated,
  };
}
