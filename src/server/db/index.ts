import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

export const client = createClient({
	url: env.DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
