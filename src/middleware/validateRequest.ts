import { NextFunction, Request, Response } from "express"

import { ZodSchema } from "zod"

const validateRequest =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }))

      return res.status(400).json({ success: false, errors })
    }
    next()
  }

export default validateRequest
