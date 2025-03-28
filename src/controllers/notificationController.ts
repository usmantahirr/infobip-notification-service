import { NextFunction, Request, Response } from "express"

import { v4 as uuidv4 } from "uuid"

import logger from "../config/logger"
import upload from "../config/upload"
import { FileError, ValidationError } from "../errors/AppError"
import { Notification, NotificationRequestSchema } from "../schemas"
import { NotificationService } from "../services/notificationService"

export class NotificationController {
  private notificationService: NotificationService

  constructor() {
    this.notificationService = new NotificationService()
    this.sendNotification = this.sendNotification.bind(this)
  }

  async sendNotification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    upload.single("attachment")(req, res, async (err) => {
      if (err) {
        return next(new FileError(err.message))
      }

      try {
        const validationResult = NotificationRequestSchema.safeParse(req.body)
        if (!validationResult.success) {
          const errors = validationResult.error.errors.map((err) => err.message)
          return next(new ValidationError(errors.join(", ")))
        }

        const { type, recipient, message, subject } = validationResult.data

        if (type === "sms" && req.file) {
          return next(
            new ValidationError("Attachments are not allowed for SMS"),
          )
        }

        const notification: Notification = {
          id: uuidv4(),
          type,
          recipient,
          message,
          subject,
          file: req.file,
          createdAt: new Date(),
        }

        const response =
          await this.notificationService.sendNotification(notification)
        res.status(200).json({
          success: true,
          id: notification.id,
          response: response.data,
        })
      } catch (error) {
        logger.error(`NotificationController error: ${error}`)
        next(error)
      }
    })
  }
}

export default new NotificationController()
