import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
	schema: "./src/server/db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
