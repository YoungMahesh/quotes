import { type Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "turso" as Config["dialect"],
  dbCredentials: {
    url: env.TURSO_CONNECTION_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  out: "./drizzle",
} satisfies Config;
