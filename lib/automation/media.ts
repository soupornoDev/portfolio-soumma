import { DownloadedMedia } from "./types";

/**
 * Download pictures and videos attached to the Thread.
 * Preserves original quality and generates base64 representations for Gemini multimodal analysis.
 */
export async function downloadThreadMedia(mediaUrls: string[]): Promise<DownloadedMedia[]> {
  if (!mediaUrls || mediaUrls.length === 0) {
    return [];
  }

  const results: DownloadedMedia[] = [];

  for (let i = 0; i < mediaUrls.length; i++) {
    const url = mediaUrls[i];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[Media Downloader] Failed to fetch media ${url}: HTTP ${res.status}`);
        continue;
      }

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = res.headers.get("content-type") || "image/jpeg";
      const base64 = buffer.toString("base64");
      const ext = mimeType.split("/")[1]?.split(";")[0] || "jpg";

      results.push({
        url,
        buffer,
        base64,
        mimeType,
        filename: `thread_media_${i + 1}.${ext}`,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(`[Media Downloader] Error fetching media item ${i + 1} (${url}): ${errMsg}`);
    }
  }

  return results;
}
