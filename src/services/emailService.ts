import sgMail from "@sendgrid/mail"

import logger from "../config/logger"

export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")
  }

  async sendEmail(
    recipient: string,
    subject: string,
    message: string,
  ): Promise<void> {
    try {
      const msg = {
        to: recipient,
        from: process.env.SENDGRID_FROM_EMAIL || "",
        subject: subject,
        text: message,
      }
      logger.info(`Sending email to ${recipient}`)
      await sgMail.send(msg)
      return Promise.resolve()
    } catch (error) {
      logger.error(`Failed to send email to ${recipient}: ${error}`)
      throw new Error("Email sending failed")
    }
  }
}

export default new EmailService()
