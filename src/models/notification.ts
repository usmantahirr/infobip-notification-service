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
  file?: Express.Multer.File
  createdAt: Date
}

interface InfobipMessageStatus {
  groupId: number
  groupName: string
  id: number
  name: string
  description: string
}

export interface InfobipMessage {
  to: string
  messageId: string
  status: InfobipMessageStatus
}

export interface InfobipNotificationResponse {
  bulkId: string
  messages: InfobipMessage[]
}
