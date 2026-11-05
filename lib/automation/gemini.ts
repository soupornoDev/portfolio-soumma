import { DownloadedMedia, GeneratedBlogArticle } from "./types";

/**
 * Expand Thread content into a rich 800-1200 word blog post using Gemini API.
 * Multimodal input handles thread text and attached diagrams/images.
 */
export async function generateBlogFromThread(
  threadText: string,
  media: DownloadedMedia[]
): Promise<GeneratedBlogArticle> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  // Model choice: Supports gemini-2.5-flash, gemini-3.8-flash, or configured model
  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const imageCount = media.filter((m) => m.mimeType.startsWith("image/")).length;

  const systemPrompt = `You are an elite mechanical engineering consultant, CNC machine design expert, and engaging technical blog writer writing for Soumma Chakraborty (@_s_o_u_m_m_a_).
Your task is to transform a short social media Thread post into a comprehensive, authoritative, and engaging 800 to 1200 word technical blog article for Blogger.

WRITING GUIDELINES:
1. Tone: Professional, passionate, engineering-grounded, clear, and engaging.
2. Structure:
   - Captivating Introduction setting the engineering problem/context.
   - 3 to 4 substantial H2 sections with technical explanations.
   - H3 subheadings, bullet points, numbered lists, and bold technical callouts.
   - Practical takeaways, industry context, or shopfloor insights.
   - Action-oriented Conclusion and invitation to discuss/comment.
3. Length: Must be 800 to 1200 words of rich content.
4. Image Placement:
   - There are ${imageCount} attached images.
   ${
     imageCount > 0
       ? `Place markers exactly as [IMAGE_1], [IMAGE_2], etc., where each image fits best contextually in the HTML body.`
       : `No images are available. Do not include image markers.`
   }
5. SEO:
   - Title: Engaging, SEO-friendly, strictly under 60 characters.
   - Meta description: Compelling, keyword-rich, exactly 140-160 characters (aim for 155 chars).
   - Labels: Exactly 5 relevant technical tags/categories for Blogger.
   - Slug: Clean URL slug (e.g. 'cnc-machine-gantry-rigidity-design').

OUTPUT FORMAT:
You MUST respond with valid JSON adhering to this exact schema:
{
  "title": "string (under 60 chars)",
  "content_html": "string (rich HTML with <h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>, [IMAGE_n])",
  "meta_description": "string (140 to 160 chars)",
  "labels": ["string", "string", "string", "string", "string"],
  "slug": "string"
}`;

  // Build multimodal parts
  const contentsParts: Array<
    | { text: string }
    | { inline_data: { mime_type: string; data: string } }
  > = [
    {
      text: `Here is the original Thread post from @_s_o_u_m_m_a_:\n\n"""\n${threadText}\n"""\n\nPlease expand this into an 800-1200 word complete technical blog post as JSON.`,
    },
  ];

  // Attach images as inline_data
  for (let i = 0; i < media.length; i++) {
    const item = media[i];
    if (item.mimeType.startsWith("image/")) {
      contentsParts.push({
        inline_data: {
          mime_type: item.mimeType,
          data: item.base64,
        },
      });
    }
  }

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: contentsParts,
      },
    ],
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    generation_config: {
      response_mime_type: "application/json",
      temperature: 0.7,
      max_output_tokens: 4096,
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    // Fallback: If 2.5-flash endpoint is unavailable or returns 404, retry with gemini-3.8-flash
    if (response.status === 404 && model !== "gemini-3.8-flash") {
      console.warn(`[Gemini API] ${model} unavailable, retrying with gemini-3.8-flash...`);
      const fallbackEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        const rawJson = fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text;
        return parseAndValidateGeminiResponse(rawJson);
      }
    }
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawJson) {
    throw new Error("Gemini returned an empty response.");
  }

  return parseAndValidateGeminiResponse(rawJson);
}

interface GeminiParsedOutput {
  title?: string;
  content_html?: string;
  meta_description?: string;
  labels?: string[];
  slug?: string;
}

function parseAndValidateGeminiResponse(rawJson: string): GeneratedBlogArticle {
  let parsed: GeminiParsedOutput;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    // Strip markdown code fences if present
    const cleaned = rawJson.replace(/```(?:json)?/g, "").trim();
    parsed = JSON.parse(cleaned);
  }

  const title = (parsed.title || "Mechanical Design Insights").trim().slice(0, 60);
  const content_html = parsed.content_html || "<p>Article content could not be generated.</p>";
  const meta_description = (parsed.meta_description || "").trim().slice(0, 160);
  const labels = Array.isArray(parsed.labels)
    ? parsed.labels.slice(0, 5).map((l: string) => String(l).trim())
    : ["Mechanical Engineering", "CNC Design", "CAD/CAM", "Manufacturing", "Tool Design"];
  const slug = (parsed.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim();

  // Approximate word count
  const plainText = content_html.replace(/<[^>]+>/g, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  return {
    title,
    content_html,
    meta_description,
    labels,
    slug,
    wordCount,
  };
}
