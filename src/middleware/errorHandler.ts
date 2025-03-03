import { NextFunction, Request, Response } from "express"

import logger from "../config/logger"

interface ErrorType extends Error {
  status?: number
}

const errorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(`Error: ${err.message}`)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
}

export default errorHandler
