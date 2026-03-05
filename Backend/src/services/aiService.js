// src/services/aiService.js
// RAG-based AI Assistant using LangChain + OpenAI
// Embeddings stored as JSON text, cosine similarity computed in-memory
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "text-embedding-3-small",
});

const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4o-mini",
    temperature: 0.2,
});

/**
 * Compute cosine similarity between two vectors.
 */
function cosineSimilarity(a, b) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Ingest text documents into the knowledge base.
 * Splits the content into chunks, embeds each chunk, and saves to PostgreSQL.
 */
export const ingestDocument = async (content, metadata = {}) => {
    if (!content?.trim()) throw createError("Content is required", 400);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const chunks = await splitter.createDocuments([content]);
    const results = [];

    for (const chunk of chunks) {
        const [embedding] = await embeddings.embedDocuments([chunk.pageContent]);

        const doc = await prisma.knowledgeDocument.create({
            data: {
                content: chunk.pageContent,
                metadata: JSON.stringify(metadata),
                embedding: JSON.stringify(embedding),
            },
        });

        results.push({ id: doc.id, content: doc.content, createdAt: doc.createdAt });
    }

    return { message: `✅ Ingested ${results.length} chunk(s)`, documents: results };
};

/**
 * Given a question, retrieve relevant context and generate an answer.
 */
export const chat = async (question) => {
    if (!question?.trim()) throw createError("Question is required", 400);

    // 1. Embed the user question
    const [queryEmbedding] = await embeddings.embedDocuments([question]);

    // 2. Load all documents and compute cosine similarity in-memory
    const allDocs = await prisma.knowledgeDocument.findMany({
        select: { id: true, content: true, metadata: true, embedding: true },
    });

    if (allDocs.length === 0) {
        return {
            answer:
                "I don't have information on that topic yet. Please contact support or check the documentation.",
            sources: [],
        };
    }

    // 3. Score and sort by similarity
    const scored = allDocs.map((doc) => {
        const docEmbedding = JSON.parse(doc.embedding);
        const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
        return { ...doc, similarity };
    });

    scored.sort((a, b) => b.similarity - a.similarity);
    const topDocs = scored.slice(0, 5);

    // 4. Build context from top documents
    const context = topDocs.map((doc) => doc.content).join("\n\n---\n\n");

    // 5. Generate answer using RAG prompt
    const promptTemplate = PromptTemplate.fromTemplate(`
You are a helpful AI assistant for MarketAi, a powerful AI-powered marketing platform.
Answer the user's question based ONLY on the provided context below.
If the context doesn't contain enough information to answer clearly, say so honestly.
Be professional, concise, and helpful.

Context:
{context}

Question: {question}

Answer:`);

    const chain = promptTemplate.pipe(llm).pipe(new StringOutputParser());
    const answer = await chain.invoke({ context, question });

    return {
        answer,
        sources: topDocs.map((d) => ({
            content: d.content.slice(0, 200) + (d.content.length > 200 ? "..." : ""),
            similarity: parseFloat(d.similarity.toFixed(4)),
        })),
    };
};

/**
 * List all ingested knowledge documents.
 */
export const listDocuments = async () => {
    return prisma.knowledgeDocument.findMany({
        select: { id: true, content: true, metadata: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 100,
    });
};

/**
 * Delete a knowledge document by ID.
 */
export const deleteDocument = async (id) => {
    const doc = await prisma.knowledgeDocument.findUnique({ where: { id } });
    if (!doc) throw createError("Document not found", 404);
    await prisma.knowledgeDocument.delete({ where: { id } });
    return { message: "Document deleted", id };
};
