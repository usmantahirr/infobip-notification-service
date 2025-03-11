import axios from "axios"
import dotenv from "dotenv"

import logger from "../config/logger"

dotenv.config()

export class SmsService {
  private apiKey: string
  private baseUrl: string
  private senderNumber: string

  constructor() {
    this.apiKey = process.env.INFOBIP_API_KEY || ""
    this.baseUrl = process.env.INFOBIP_BASE_URL || ""
    this.senderNumber = process.env.INFOBIP_SENDER_NUMBER || ""
  }

  async sendSms(recipient: string, message: string) {
    try {
      const body = {
        messages: [
          {
            from: this.senderNumber,
            destinations: [
              {
                to: recipient,
              },
            ],
            text: message,
          },
        ],
      }

      const url = `https://${this.baseUrl}/sms/2/text/advanced`

      const response = axios.post(url, body, {
        headers: {
          Authorization: `App ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      logger.info(`SMS sent successfully to ${recipient}`, response)
      return response
    } catch (error) {
      logger.error(`Failed to send SMS: ${error}`)
      throw new Error("SMS sending failed")
    }
  }
}

export default new SmsService()
