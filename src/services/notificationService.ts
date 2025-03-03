import logger from "../config/logger"
import { Notification } from "../models/notification"
import { EmailService } from "./emailService"
import { SmsService } from "./smsService"

export class NotificationService {
  private emailService: EmailService
  private smsService: SmsService

  constructor() {
    this.emailService = new EmailService()
    this.smsService = new SmsService()
  }

  async sendNotification(notification: Notification): Promise<void> {
    try {
      if (notification.type === "email") {
        await this.emailService.sendEmail(
          notification.recipient,
          notification.message,
          notification.subject!,
        )
      } else if (notification.type === "sms") {
        await this.smsService.sendSms(
          notification.recipient,
          notification.message,
        )
      } else {
        throw new Error("Unsupported notification type")
      }
      logger.info(`Notification sent successfully to ${notification.recipient}`)
    } catch (error) {
      logger.error(`Error sending notification: ${error}`)
      throw error
    }
  }
}
