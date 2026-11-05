import { ThreadPostData } from "./types";

/**
 * Decodes standard HTML entities commonly found in meta tags and web responses.
 */
function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#064;/g, "@")
    .replace(/&#x2022;/g, "•")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

interface ImageCandidate {
  url: string;
  width?: number;
  height?: number;
}

interface ThreadsPostRaw {
  id?: string;
  pk?: string;
  code?: string;
  caption?: { text?: string };
  image_versions2?: { candidates?: ImageCandidate[] };
  carousel_media?: Array<{ image_versions2?: { candidates?: ImageCandidate[] } }>;
  video_versions?: Array<{ url?: string }>;
  permalink?: string;
  taken_at?: number;
}

interface ThreadItemRaw {
  post?: ThreadsPostRaw;
}

/**
 * Recursive finder for thread_items in the GraphQL data graph
 */
function findThreadItemsInGraph(node: unknown): ThreadItemRaw[] | null {
  if (!node || typeof node !== "object") return null;
  const candidate = node as { thread_items?: ThreadItemRaw[] };
  if (Array.isArray(candidate.thread_items) && candidate.thread_items.length > 0) {
    return candidate.thread_items;
  }
  for (const child of Object.values(node as Record<string, unknown>)) {
    const found = findThreadItemsInGraph(child);
    if (found) return found;
  }
  return null;
}

/**
 * Recursive finder for a post object in single post GraphQL data
 */
function findPostInGraph(node: unknown): ThreadsPostRaw | null {
  if (!node || typeof node !== "object") return null;
  const candidate = node as { caption?: { text?: string } };
  if (candidate.caption && typeof candidate.caption.text === "string") {
    return candidate as ThreadsPostRaw;
  }
  for (const child of Object.values(node as Record<string, unknown>)) {
    const found = findPostInGraph(child);
    if (found) return found;
  }
  return null;
}

/**
 * Scrapes public Threads profile (@_s_o_u_m_m_a_) without requiring an API access token.
 * Uses social crawler User-Agent headers to receive Meta's full SSR HTML and embedded JSON payloads.
 */
async function scrapeThreadsProfile(username: string): Promise<ThreadPostData> {
  const profileUrl = `https://www.threads.net/@${username}`;
  const response = await fetch(profileUrl, {
    method: "GET",
    headers: {
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Threads profile @${username} returned HTTP status ${response.status}`);
  }

  const html = await response.text();

  // Search embedded application/json scripts for thread_items
  const jsonScripts = html.match(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi) || [];

  for (const scriptTag of jsonScripts) {
    if (!scriptTag.includes("thread_items")) continue;

    const rawJson = scriptTag.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const parsed = JSON.parse(rawJson);
      const threadItems = findThreadItemsInGraph(parsed);

      if (threadItems && threadItems.length > 0) {
        const textParts: string[] = [];
        const mediaUrls: string[] = [];
        let firstPost: ThreadsPostRaw | null = null;

        for (const item of threadItems) {
          const post = item.post;
          if (!post) continue;
          if (!firstPost) firstPost = post;

          const captionText = post.caption?.text?.trim();
          if (captionText) {
            textParts.push(captionText);
          }

          // Single image candidate (pick highest resolution)
          if (post.image_versions2?.candidates && post.image_versions2.candidates.length > 0) {
            const best = post.image_versions2.candidates.reduce(
              (prev: ImageCandidate, curr: ImageCandidate) => {
                const prevArea = (prev.width || 0) * (prev.height || 0);
                const currArea = (curr.width || 0) * (curr.height || 0);
                return currArea > prevArea ? curr : prev;
              },
              post.image_versions2.candidates[0]
            );
            if (best?.url) mediaUrls.push(best.url);
          }

          // Carousel items
          if (Array.isArray(post.carousel_media)) {
            for (const cm of post.carousel_media) {
              if (cm.image_versions2?.candidates && cm.image_versions2.candidates.length > 0) {
                const best = cm.image_versions2.candidates.reduce(
                  (prev: ImageCandidate, curr: ImageCandidate) => {
                    const prevArea = (prev.width || 0) * (prev.height || 0);
                    const currArea = (curr.width || 0) * (curr.height || 0);
                    return currArea > prevArea ? curr : prev;
                  },
                  cm.image_versions2.candidates[0]
                );
                if (best?.url) mediaUrls.push(best.url);
              }
            }
          }

          // Video versions
          if (Array.isArray(post.video_versions) && post.video_versions.length > 0) {
            const videoUrl = post.video_versions[0]?.url;
            if (videoUrl) mediaUrls.push(videoUrl);
          }
        }

        const combinedText = textParts.join("\n\n");
        const postCode = firstPost?.code || "";
        const permalink =
          firstPost?.permalink ||
          (postCode ? `https://www.threads.net/@${username}/post/${postCode}` : profileUrl);
        const timestamp = firstPost?.taken_at
          ? new Date(firstPost.taken_at * 1000).toISOString()
          : new Date().toISOString();
        const id = firstPost?.id || postCode || `threads-${Date.now()}`;

        return {
          id,
          text: combinedText,
          timestamp,
          permalink,
          mediaUrls: Array.from(new Set(mediaUrls)),
        };
      }
    } catch {
      // Continue to next script
    }
  }

  // Fallback: Check OpenGraph tags if JSON structure was not matched
  const ogDescMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
  const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/i);

  if (ogDescMatch) {
    const text = decodeHtmlEntities(ogDescMatch[1]);
    if (!text.includes("Followers") || text.length > 80) {
      const mediaUrls: string[] = [];
      if (ogImageMatch) {
        const img = decodeHtmlEntities(ogImageMatch[1]);
        if (!img.includes("rsrc.php") && !img.includes("favicon")) {
          mediaUrls.push(img);
        }
      }

      return {
        id: `og-${Date.now()}`,
        text,
        timestamp: new Date().toISOString(),
        permalink: ogUrlMatch ? decodeHtmlEntities(ogUrlMatch[1]) : profileUrl,
        mediaUrls,
      };
    }
  }

  throw new Error(`No posts found on public Threads profile @${username}`);
}

/**
 * Scrapes an individual Threads post URL without requiring an access token.
 */
async function scrapeSingleThreadsPost(postUrl: string): Promise<ThreadPostData> {
  const response = await fetch(postUrl, {
    method: "GET",
    headers: {
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Threads post returned HTTP status ${response.status}`);
  }

  const html = await response.text();

  // Try extracting full JSON data first
  const jsonScripts = html.match(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const s of jsonScripts) {
    if (!s.includes("caption") && !s.includes("image_versions2")) continue;
    const raw = s.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const obj = JSON.parse(raw);
      const post = findPostInGraph(obj);

      if (post) {
        const text = post.caption?.text || "";
        const mediaUrls: string[] = [];
        if (post.image_versions2?.candidates && post.image_versions2.candidates.length > 0) {
          mediaUrls.push(post.image_versions2.candidates[0].url);
        }
        return {
          id: post.id || post.code || `post-${Date.now()}`,
          text,
          timestamp: post.taken_at
            ? new Date(post.taken_at * 1000).toISOString()
            : new Date().toISOString(),
          permalink: postUrl,
          mediaUrls,
        };
      }
    } catch {
      // Continue
    }
  }

  // Fallback: OpenGraph tags
  const ogDescMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
  const codeMatch = postUrl.match(/\/post\/([A-Za-z0-9_-]+)/);

  if (ogDescMatch) {
    const text = decodeHtmlEntities(ogDescMatch[1]);
    const mediaUrls: string[] = [];
    if (ogImageMatch) {
      const img = decodeHtmlEntities(ogImageMatch[1]);
      if (!img.includes("rsrc.php") && !img.includes("favicon")) {
        mediaUrls.push(img);
      }
    }
    return {
      id: codeMatch ? codeMatch[1] : `post-${Date.now()}`,
      text,
      timestamp: new Date().toISOString(),
      permalink: postUrl,
      mediaUrls,
    };
  }

  throw new Error(`Unable to extract content from Threads post: ${postUrl}`);
}

/**
 * Optional Meta Threads Graph API caller (used ONLY if user explicitly provides THREADS_ACCESS_TOKEN)
 */
async function fetchFromGraphApi(
  accessToken: string,
  userId = "me"
): Promise<ThreadPostData | null> {
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
    console.warn(`[Threads Graph API] Status ${response.status}: ${errText}`);
    return null;
  }

  const data = await response.json();
  const latestItem = data?.data?.[0];
  if (!latestItem) return null;

  const mediaUrls: string[] = [];
  if (latestItem.media_type === "CAROUSEL_ALBUM" && latestItem.children?.data) {
    for (const child of latestItem.children.data) {
      if (child.media_url) mediaUrls.push(child.media_url);
    }
  } else if (latestItem.media_url) {
    mediaUrls.push(latestItem.media_url);
  }

  return {
    id: latestItem.id,
    text: latestItem.text || "",
    timestamp: latestItem.timestamp || new Date().toISOString(),
    permalink:
      latestItem.permalink ||
      `https://www.threads.net/@_s_o_u_m_m_a_/post/${latestItem.id}`,
    mediaUrls,
  };
}

/**
 * Fetch latest thread post.
 *
 * TOKENLESS ARCHITECTURE:
 * 1. Custom payload: If the caller provided { text, mediaUrls, ... } (e.g. from Zapier, Apify, or manual trigger)
 * 2. Specific post URL: If the caller passed { url: "https://www.threads.net/..." }
 * 3. Tokenless Web Scraper: Queries public @_s_o_u_m_m_a_ profile and extracts thread text, carousel, & media
 * 4. Meta Graph API: Used optionally ONLY if THREADS_ACCESS_TOKEN is provided in .env
 */
export async function getLatestThreadPost(
  customPayload?: Partial<ThreadPostData> & { url?: string; postUrl?: string }
): Promise<{ post: ThreadPostData | null; error?: string }> {
  // Strategy 1: Direct text provided in request body
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

  // Strategy 2: Specific post URL provided
  const targetPostUrl = customPayload?.url || customPayload?.postUrl;
  if (targetPostUrl && targetPostUrl.includes("threads.net/")) {
    try {
      const singlePost = await scrapeSingleThreadsPost(targetPostUrl);
      return { post: singlePost };
    } catch (err) {
      console.warn(`[Threads Single Post Scrape Failed]:`, err);
    }
  }

  // Strategy 3: Optional Meta Threads Graph API (only if token is explicitly supplied)
  const optionalToken = process.env.THREADS_ACCESS_TOKEN?.trim();
  if (optionalToken) {
    try {
      const graphPost = await fetchFromGraphApi(optionalToken, process.env.THREADS_USER_ID || "me");
      if (graphPost) {
        return { post: graphPost };
      }
    } catch (err) {
      console.warn(`[Threads Graph API Fallback to Public Scraper]:`, err);
    }
  }

  // Strategy 4 (Primary Tokenless Default): Scrape public Threads profile @_s_o_u_m_m_a_
  const username = process.env.THREADS_USERNAME?.trim() || "_s_o_u_m_m_a_";
  try {
    const scrapedPost = await scrapeThreadsProfile(username);
    return { post: scrapedPost };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      post: null,
      error: `Failed to fetch Threads post for @${username} (Tokenless Mode): ${message}`,
    };
  }
}
