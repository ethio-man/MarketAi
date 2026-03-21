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
    if (!question) {
      return res
        .status(400)
        .json({ success: false, error: "Question is required" });
    }
    const question = `You are a professional social media copywriter.

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
5. Highlight the product’s value or appeal.
6. Include a subtle call-to-action (CTA).
7. Keep it short (max 1–2 sentences).
8. Avoid emojis unless the tone explicitly suggests it.

Output Format:
- Return only the caption text.
- Do NOT include explanations, labels, or extra formatting.`;
    const result = await aiService.chat(question);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
