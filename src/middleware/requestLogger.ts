import { NextFunction, Request, Response } from "express"

import logger from "../config/logger"

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now()

  res.on("finish", () => {
    const duration = Date.now() - start
    const logMessage = `Request: ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | IP: ${req.ip} | User-Agent: ${req.get("user-agent")}`
    logger.info(logMessage)
  })

  next()
}
