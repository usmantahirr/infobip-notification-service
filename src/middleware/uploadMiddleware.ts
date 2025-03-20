import { NextFunction, Request, Response } from "express"

import multer from "multer"

import upload from "../config/upload"

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single("attachment")(req, res, (err: multer.MulterError | any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` })
    } else if (err) {
      return res.status(400).json({ error: `Unknown error: ${err.message}` })
    }
    next()
  })
}

export default uploadMiddleware
