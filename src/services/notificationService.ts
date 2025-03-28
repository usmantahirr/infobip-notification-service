import { AxiosResponse } from "axios"

import logger from "../config/logger"
import { Notification } from "../schemas"
import { EmailService } from "./emailService"
import { SmsService } from "./smsService"

export class NotificationService {
  private emailService: EmailService
  private smsService: SmsService

  constructor() {
    this.emailService = new EmailService()
    this.smsService = new SmsService()
  }

  async sendNotification(notification: Notification): Promise<AxiosResponse> {
    try {
      if (notification.type === "email") {
        return await this.emailService.sendEmail(
          notification.recipient,
          notification.subject || "Fidamy Notification",
          notification.message,
          notification.file,
        )
      } else if (notification.type === "sms") {
        return await this.smsService.sendSms(
          notification.recipient,
          notification.message,
        )
      } else {
        throw new Error("Unsupported notification type")
      }
    } catch (error) {
      logger.error(`Error sending notification: ${error}`)
      throw error
    }
  }
}
