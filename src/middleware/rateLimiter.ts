import rateLimit from "express-rate-limit"

import { config } from "../config/config"

const rateLimiter = rateLimit({
  windowMs: config.security.rateLimitWindowMs,
  max: config.security.rateLimitMaxRequests,
  message: "Too many requests from this IP, please try again later.",
})

export default rateLimiter
