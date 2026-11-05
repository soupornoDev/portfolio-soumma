import { ThreadPostData } from "./types";

/**
 * Fetch latest thread from Threads Graph API or parse webhook payload.
 * Target account: @_s_o_u_m_m_a_
 */
export async function getLatestThreadPost(
  customPayload?: Partial<ThreadPostData>
): Promise<{ post: ThreadPostData | null; error?: string }> {
  // If the request provided a payload directly (e.g. from Apify, RSS, or manual trigger)
  if (customPayload?.text) {
    return {
      post: {
        id: customPayload.id || `manual-${Date.now()}`,
        text: customPayload.text.trim(),
        timestamp: customPayload.timestamp || new Date().toISOString(),
        permalink: customPayload.permalink || `https://www.threads.net/@_s_o_u_m_m_a_`,
        mediaUrls: Array.isArray(customPayload.mediaUrls) ? customPayload.mediaUrls : [],
      },
    };
  }

  const accessToken = process.env.THREADS_ACCESS_TOKEN?.trim();
  const userId = process.env.THREADS_USER_ID?.trim() || "me";

  if (!accessToken) {
    return {
      post: null,
      error:
        "THREADS_ACCESS_TOKEN is not configured. Provide text in the request body or configure THREADS_ACCESS_TOKEN in .env.",
    };
  }

  try {
    // 1. Fetch user's latest threads from Meta Threads Graph API
    const url = `https://graph.threads.net/v1.0/${userId}/threads?fields=id,media_product_type,media_type,media_url,permalink,text,timestamp,shortcode,children{id,media_type,media_url}&limit=1&access_token=${encodeURIComponent(
      accessToken
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        post: null,
        error: `Threads API error (${response.status}): ${errText}`,
      };
    }

    const data = await response.json();
    const latestItem = data?.data?.[0];

    if (!latestItem) {
      return {
        post: null,
        error: "No thread posts found on the connected Threads account.",
      };
    }

    const mediaUrls: string[] = [];

    // Check for carousel album (multiple media)
    if (latestItem.media_type === "CAROUSEL_ALBUM" && latestItem.children?.data) {
      for (const child of latestItem.children.data) {
        if (child.media_url) {
          mediaUrls.push(child.media_url);
        }
      }
    } else if (latestItem.media_url) {
      mediaUrls.push(latestItem.media_url);
    }

    return {
      post: {
        id: latestItem.id,
        text: latestItem.text || "",
        timestamp: latestItem.timestamp || new Date().toISOString(),
        permalink: latestItem.permalink || `https://www.threads.net/@_s_o_u_m_m_a_/post/${latestItem.id}`,
        mediaUrls,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      post: null,
      error: `Failed to query Threads Graph API: ${message}`,
    };
  }
}
