// src/controllers/aiController.js
import * as aiService from "../services/aiService.js";

// POST /api/chat - User asks the AI assistant a question
export const askAssistant = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, error: "Question is required" });
    }
    const result = await aiService.chat(question);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/knowledge - Admin uploads knowledge text for ingestion
export const ingestKnowledge = async (req, res, next) => {
  try {
    const { content, metadata } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ success: false, error: "Content is required" });
    }
    const result = await aiService.ingestDocument(content, metadata || {});
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// GET /api/knowledge - Admin lists all knowledge documents
export const listKnowledge = async (req, res, next) => {
  try {
    const documents = await aiService.listDocuments();
    res.status(200).json({ success: true, data: documents });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/knowledge/:id - Admin deletes a knowledge document
export const deleteKnowledge = async (req, res, next) => {
  try {
    const result = await aiService.deleteDocument(req.params.id);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const generateCaption = async (req, res, next) => {
  try {
    const { product_name, brand, caption_language, tone } = req.body;
    if (!product_name || !brand || !caption_language || !tone) {
      return res.status(400).json({
        success: false,
        error: "product_name, brand, caption_language and tone are required",
      });
    }
    const captionQuestion = `You are a professional social media copywriter.

Your task is to generate ONE concise, high-impact advertising caption for a social media post.

Use the following inputs:
- Product Name: ${product_name}
- Brand: ${brand}
- Language: ${caption_language}
- Tone: ${tone}

Instructions:
1. Write ONLY one caption (no multiple options).
2. Keep it clear, engaging, and persuasive.
3. Match the tone exactly as specified.
4. Use the specified language correctly and naturally.
5. Highlight the product's value or appeal.
6. Include a subtle call-to-action (CTA).
7. Keep it short (max 1–2 sentences).
8. Avoid emojis unless the tone explicitly suggests it.

Output Format:
- Return only the caption text.
- Do NOT include explanations, labels, or extra formatting.`;

    const hashtagQuestion = `You are a social media hashtag expert.

Generate 7 highly relevant and targeted hashtags for a social media advertisement post.

Use the following inputs:
- Product Name: ${product_name}
- Brand: ${brand}
- Tone: ${tone}

Instructions:
1. Generate exactly 7 hashtags.
2. Mix popular broad hashtags and niche specific ones.
3. All hashtags must be in English regardless of product language.
4. Make them directly relevant to the product and brand.
5. No spaces within hashtags.

Output Format:
- Return ONLY the hashtags, separated by spaces.
- Example: #Coffee #EthiopianCoffee #MorningBrew #LocalBrand #ArtisanCoffee #CoffeeCulture #BrewYourBest
- Do NOT include any other text, labels, or explanation.`;

    // Generate caption and hashtags concurrently
    const [captionResult, hashtagResult] = await Promise.all([
      aiService.chat(captionQuestion),
      aiService.chat(hashtagQuestion),
    ]);

    // Parse hashtags from the result into an array
    const hashtags = (hashtagResult.answer || "")
      .split(/\s+/)
      .filter(h => h.startsWith("#"))
      .slice(0, 8);

    res.status(200).json({
      success: true,
      answer: captionResult.answer,
      hashtags,
    });
  } catch (err) {
    next(err);
  }
};

export const generateImage = async (req, res, next) => {
  try {
    const { product_name, brand, tone } = req.body;
    if (!product_name || !brand) {
      return res.status(400).json({
        success: false,
        error: "product_name and brand are required"
      });
    }

    // Build advertisement image prompt from user inputs
    const toneStyles = {
      fun:        "vibrant colors, playful setting, bold product hero shot, bright sunlight",
      formal:     "clean minimalist studio, premium lighting, elegant composition, soft shadows",
      persuasive: "cinematic golden hour, dramatic lighting, aspirational lifestyle",
    };
    const styleDesc = toneStyles[(tone || "").toLowerCase()] || "professional studio, soft shadows";
    const imagePrompt = `advertising product photo of ${product_name} by ${brand}, ${styleDesc}, high-end commercial photography, 4k`;

    // Submit job to Stable Horde (free anonymous tier)
    const submitRes = await fetch("https://stablehorde.net/api/v2/generate/async", {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": "0000000000" },
      body: JSON.stringify({
        prompt: imagePrompt,
        params: { steps: 20, width: 512, height: 512, n: 1, sampler_name: "k_euler" },
        r2: true,
        shared: false,
        models: ["stable_diffusion"]
      })
    });

    if (!submitRes.ok) {
      throw new Error(`Stable Horde submit failed: ${submitRes.status}`);
    }
    const { id: jobId } = await submitRes.json();

    // Poll until done (up to 30 attempts × 5s = 2.5 minutes)
    let imageUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const statusRes = await fetch(`https://stablehorde.net/api/v2/generate/status/${jobId}`, {
        headers: { "apikey": "0000000000" }
      });
      const statusData = await statusRes.json();
      if (statusData.done) {
        imageUrl = statusData.generations?.[0]?.img;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error("Image generation timed out. Please try again.");
    }

    res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    next(err);
  }
};
