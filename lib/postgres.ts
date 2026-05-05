import { Pool } from "pg";

const connectionString =
  process.env.SUPABASE_SESSION_POOLER_URL ??
  process.env.SUPABASE_POSTGRES_SESSION_POOL_URL;

declare global {
  var postgresPool: Pool | undefined;
}

function createPool() {
  if (!connectionString) {
    throw new Error(
      "Missing SUPABASE_SESSION_POOLER_URL or SUPABASE_POSTGRES_SESSION_POOL_URL environment variable.",
    );
  }

  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: { rejectUnauthorized: false },
  });
}

export function getPostgresPool() {
  globalThis.postgresPool ??= createPool();
  return globalThis.postgresPool;
}
