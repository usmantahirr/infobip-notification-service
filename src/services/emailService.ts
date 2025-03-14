import axios from "axios"
import dotenv from "dotenv"
import FormData from "form-data"

import logger from "../config/logger"

dotenv.config()

const MAX_ATTACHMENT_SIZE = 2 * 1024 * 1024 // 2MB

export class EmailService {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly senderEmail: string

  constructor() {
    this.apiKey = process.env.INFOBIP_API_KEY || ""
    this.baseUrl = process.env.INFOBIP_BASE_URL || ""
    this.senderEmail = process.env.INFOBIP_SENDER_EMAIL || ""
  }

  async sendEmail(
    recipient: string,
    subject: string,
    message: string,
    file?: Express.Multer.File,
  ) {
    try {
      const form = new FormData()

      form.append("from", this.senderEmail)
      form.append("to", recipient)
      form.append("subject", subject)
      form.append("text", message)

      if (file) {
        if (file.size > MAX_ATTACHMENT_SIZE) {
          throw new Error("Attachment size exceeds 2MB limit")
        }

        form.append("attachment", file.buffer, { filename: file.originalname })
      }

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
