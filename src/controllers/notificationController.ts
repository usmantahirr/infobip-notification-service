import { NextFunction, Request, Response } from "express"

import { v4 as uuidv4 } from "uuid"

import logger from "../config/logger"
import { Notification } from "../models//notification"
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
    try {
      const { type, recipient, message } = req.body
      if (!type || !recipient || !message) {
        res
          .status(400)
          .json({ error: "Missing required fields: type, recipient, message" })
        return
      }

      // Create a new notification object
      const notification: Notification = {
        id: uuidv4(),
        type,
        recipient,
        message,
        createdAt: new Date(),
      }

      await this.notificationService.sendNotification(notification)
      res.status(200).json({ success: true, id: notification.id })
    } catch (error) {
      logger.error(`NotificationController error: ${error}`)
      next(error) // pass error to centralized error handler
    }
  }
}

export default new NotificationController()
