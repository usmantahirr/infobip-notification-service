import dotenv from "dotenv"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

export const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  security: {
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    rateLimitMaxRequests: parseInt(
      process.env.RATE_LIMIT_MAX_REQUESTS || "100",
    ), // 100 requests per window
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || ["*"],
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
}
