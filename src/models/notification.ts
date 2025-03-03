import { z } from "zod"

export const notificationSchema = z.object({
  type: z.enum(["sms", "email"]),
  to: z.string().nonempty("Recipient is required"),
  body: z.string().optional(),
  subject: z.string().optional(),
  text: z.string().optional(),
  html: z.string().optional(),
})

export interface Notification {
  id: string
  type: "email" | "sms"
  recipient: string
  message: string
  subject?: string
  createdAt: Date
}
