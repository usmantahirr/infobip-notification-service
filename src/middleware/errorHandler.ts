import { NextFunction, Request, Response } from "express"

import logger from "../config/logger"

interface ErrorType extends Error {
  status?: number
  details?: any
}

const errorHandler = (err: ErrorType, req: Request, res: Response): void => {
  const statusCode = err.status || 500
  const errorMessage = err.message || "Internal Server Error"

  logger.error(`Error: ${errorMessage}`)
  if (err.details) {
    logger.error(`Details: ${JSON.stringify(err.details)}`)
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

export default errorHandler
