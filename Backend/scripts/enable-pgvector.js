// enable-pgvector.js — Run once to install the pgvector extension
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    await client.query("CREATE EXTENSION IF NOT EXISTS vector;");
    console.log("✅ pgvector extension enabled successfully");
    const res = await client.query(
      "SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';",
    );
    console.log("Extension details:", res.rows);
  } catch (err) {
    console.error("❌ Failed to enable pgvector:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
