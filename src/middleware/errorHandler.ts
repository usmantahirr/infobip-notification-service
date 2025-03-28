import { NextFunction, Request, Response } from "express"

import logger from "../config/logger"
import { AppError } from "../errors/AppError"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(`Error: ${err.message}`)

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    })
    return
  }

  // Handle unexpected errors
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

export default errorHandler
