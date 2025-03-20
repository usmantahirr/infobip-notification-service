import { Express } from "express"

import cors from "cors"
import helmet from "helmet"

import { config } from "../config/config"

const securityMiddleware = (app: Express) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "trusted-cdn.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      referrerPolicy: { policy: "no-referrer" },
      frameguard: { action: "deny" },
    }),
  )

  app.use(
    cors({
      origin: config.security.allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
}

export default securityMiddleware
