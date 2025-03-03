import { NextFunction, Request, Response } from "express"

import { ZodSchema } from "zod"

const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, errors: result.error.format() })
    }
    next()
  }

export default validateRequest
