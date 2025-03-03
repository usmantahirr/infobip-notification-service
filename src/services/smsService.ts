import dotenv from "dotenv"
import twilio from "twilio"

import logger from "../config/logger"

dotenv.config()

export class SmsService {
  private client: twilio.Twilio
  private readonly phoneNumber: string

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER || ""
  }

  async sendSms(recipient: string, message: string): Promise<string> {
    try {
      logger.info(`Sending SMS to ${recipient}`)
      const messageBody = await this.client.messages.create({
        body: message,
        from: this.phoneNumber,
        to: recipient,
      })
      return Promise.resolve(messageBody.sid)
    } catch (error) {
      logger.error(`Failed to send SMS to ${recipient}: ${error}`)
      throw new Error("SMS sending failed")
    }
  }
}

export default new SmsService()
