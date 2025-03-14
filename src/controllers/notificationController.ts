import { NextFunction, Request, Response } from "express"

import { v4 as uuidv4 } from "uuid"

import logger from "../config/logger"
import upload from "../config/upload"
import { Notification } from "../models/notification"
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
        return res.status(400).json({ error: err.message }) // Return validation error
      }

      try {
        const { type, recipient, message, subject } = req.body
        if (!type || !recipient || !message) {
          res.status(400).json({
            error: "Missing required fields: type, recipient, message",
          })
          return
        }

        if (type === "sms" && req.file) {
          res.status(400).json({ error: "Attachments are not allowed for SMS" })
          return
        }

        const notification: Notification = {
          id: uuidv4(),
          type,
          recipient,
          message,
          subject,
          file: req.file, // Attach only if exists
          createdAt: new Date(),
        }

        const response =
          await this.notificationService.sendNotification(notification)
        res
          .status(200)
          .json({ success: true, id: notification.id, response: response.data })
      } catch (error) {
        logger.error(`NotificationController error: ${error}`)
        next(error) // Pass error to centralized handler
      }
    })
  }
}

export default new NotificationController()
