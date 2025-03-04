import { z } from "zod"

export const notificationBody = z.object({
  type: z.enum(["sms", "email"]),
  recipient: z.string().nonempty("Recipient is required"),
  message: z.string(),
})

export interface Notification {
  id: string
  type: "email" | "sms"
  recipient: string
  message: string
  subject?: string
  createdAt: Date
}
