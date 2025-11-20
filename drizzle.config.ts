import { defineConfig } from "drizzle-kit";

const getDatabaseUrl = () => {
  const env = process.env.NODE_ENV || 'development'

  if (env === 'production') {
    return process.env.DATABASE_URL_PRODUCTION!
  }

  return process.env.DATABASE_URL_DEVELOPMENT!
}

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
