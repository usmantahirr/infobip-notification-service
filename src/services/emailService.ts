import { AuthType, Infobip } from "@infobip-api/sdk"
import axios from "axios"
import dotenv from "dotenv"

import logger from "../config/logger"

dotenv.config()

export class EmailService {
  private apiKey: string
  private baseUrl: string
  private senderEmail: string

  constructor() {
    this.apiKey = process.env.INFOBIP_API_KEY || ""
    this.baseUrl = process.env.INFOBIP_BASE_URL || ""
    this.senderEmail = process.env.INFOBIP_SENDER_EMAIL || ""
  }

  async sendEmail(recipient: string, subject: string, message: string) {
    try {
      const form = new FormData()
      form.append("from", this.senderEmail)
      form.append("to", recipient)
      form.append("subject", subject)
      form.append("text", message)

      const url = `https://${this.baseUrl}/email/3/send`

      const response = axios.post(url, form, {
        headers: {
          Authorization: `App ${this.apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      })
      logger.info(`Email sent successfully to ${recipient}`, response)
      return response
    } catch (error) {
      logger.error(`Failed to send email: ${error}`)
      throw new Error("Email sending failed")
    }
  }
}

export default new EmailService()
