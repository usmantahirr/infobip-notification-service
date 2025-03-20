import { Request, Response } from "express"
import rateLimit from "express-rate-limit"

import { config } from "../config/config"
import logger from "../config/logger"

const rateLimiter = rateLimit({
  windowMs: config.security.rateLimitWindowMs, // Time window in milliseconds
  max: config.security.rateLimitMaxRequests, // Maximum number of requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again later.",
    })
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default rateLimiter
