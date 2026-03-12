// src/services/aiService.js
// RAG-based AI Assistant using native Cohere AI SDK
// Embeddings stored as JSON text, cosine similarity computed in-memory
import { CohereClient } from "cohere-ai";
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const EMBED_MODEL = "embed-english-v3.0";
const CHAT_MODEL = "command-r-plus-08-2024";
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;
const TOP_K = 5;

// ──────────────────────────────────────────────────────────────
// Utility: split text into overlapping chunks
// ──────────────────────────────────────────────────────────────
function splitIntoChunks(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end).trim());
    start += chunkSize - overlap;
  }
  return chunks.filter((c) => c.length > 0);
}

// ──────────────────────────────────────────────────────────────
// Utility: cosine similarity between two vectors
// ──────────────────────────────────────────────────────────────
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ──────────────────────────────────────────────────────────────
// Utility: embed a batch of texts using Cohere
// ──────────────────────────────────────────────────────────────
async function embedTexts(texts, inputType = "search_document") {
  const response = await cohere.embed({
    texts,
    model: EMBED_MODEL,
    inputType,
    embeddingTypes: ["float"],
  });
  return response.embeddings.float;
}

// ──────────────────────────────────────────────────────────────
// Ingest text documents into the knowledge base
// ──────────────────────────────────────────────────────────────
export const ingestDocument = async (content, metadata = {}) => {
  if (!content?.trim()) throw createError("Content is required", 400);

  const chunks = splitIntoChunks(content);
  const embeddingVectors = await embedTexts(chunks, "search_document");

  const results = [];
  for (let i = 0; i < chunks.length; i++) {
    const doc = await prisma.knowledgeDocument.create({
      data: {
        content: chunks[i],
        metadata: JSON.stringify(metadata),
        embedding: JSON.stringify(embeddingVectors[i]),
      },
    });
    results.push({ id: doc.id, content: doc.content, createdAt: doc.createdAt });
  }

  return {
    message: `✅ Ingested ${results.length} chunk(s)`,
    documents: results,
  };
};

// ──────────────────────────────────────────────────────────────
// Chat: retrieve relevant context, then generate an answer
// ──────────────────────────────────────────────────────────────
export const chat = async (question) => {
  if (!question?.trim()) throw createError("Question is required", 400);

  // 1. Embed the user question
  const [queryEmbedding] = await embedTexts([question], "search_query");

  // 2. Load all docs and rank by cosine similarity
  const allDocs = await prisma.knowledgeDocument.findMany({
    select: { id: true, content: true, metadata: true, embedding: true },
  });

  let context = "";
  let topDocs = [];

  if (allDocs.length > 0) {
    const scored = allDocs.map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, JSON.parse(doc.embedding)),
    }));
    scored.sort((a, b) => b.similarity - a.similarity);
    topDocs = scored.slice(0, TOP_K);

    // 3. Build context string
    context = topDocs.map((d) => d.content).join("\n\n---\n\n");
  }

  // 4. Generate answer via Cohere Chat API
  const response = await cohere.chat({
    model: CHAT_MODEL,
    temperature: 0.5,
    message: question,
    preamble: `You are a helpful AI assistant for MarketAi, a powerful AI-powered marketing platform.
If context is provided below, use it to ground your answer.
If the context is empty or doesn't contain enough information, use your general knowledge to provide a professional, concise, and helpful response.

Context:
${context}`,
  });

  const answer = response.text;

  return {
    answer,
    sources: topDocs.map((d) => ({
      content: d.content.slice(0, 200) + (d.content.length > 200 ? "..." : ""),
      similarity: parseFloat(d.similarity.toFixed(4)),
    })),
  };
};

// ──────────────────────────────────────────────────────────────
// List all ingested knowledge documents
// ──────────────────────────────────────────────────────────────
export const listDocuments = async () => {
  return prisma.knowledgeDocument.findMany({
    select: { id: true, content: true, metadata: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
};

// ──────────────────────────────────────────────────────────────
// Delete a knowledge document by ID
// ──────────────────────────────────────────────────────────────
export const deleteDocument = async (id) => {
  const doc = await prisma.knowledgeDocument.findUnique({ where: { id } });
  if (!doc) throw createError("Document not found", 404);
  await prisma.knowledgeDocument.delete({ where: { id } });
  return { message: "Document deleted", id };
};
