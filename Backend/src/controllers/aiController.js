// src/controllers/aiController.js
import * as aiService from "../services/aiService.js";

// POST /api/chat - User asks the AI assistant a question
export const askAssistant = async (req, res, next) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ success: false, error: "Question is required" });
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
            return res.status(400).json({ success: false, error: "Content is required" });
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
