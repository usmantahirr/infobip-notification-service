import { Request } from "express"

import multer, { FileFilterCallback } from "multer"
import path from "path"

const storage = multer.memoryStorage()

const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const fileExt = path.extname(file.originalname).toLowerCase()
    if (fileExt !== ".pdf") {
      return cb(new Error("Only PDF files are allowed"))
    }
    cb(null, true)
  },
})

export default upload
