import { z } from "zod"

export const NotificationTypeSchema = z.enum(["email", "sms"], {
  description: "Type of notification to send",
  required_error: "Notification type is required",
  invalid_type_error: "Notification type must be either 'email' or 'sms'",
})

export const RecipientSchema = z
  .string({
    description: "Email address or phone number of the recipient",
    required_error: "Recipient is required",
  })
  .refine(
    (val) => {
      if (val.includes("@")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      }
      return /^\+?[1-9]\d{1,14}$/.test(val)
    },
    {
      message: "Invalid email or phone number format",
    },
  )

export const MessageSchema = z
  .string({
    description: "Content of the notification",
    required_error: "Message is required",
  })
  .min(1, "Message cannot be empty")

export const SubjectSchema = z
  .string()
  .optional()
  .describe("Subject line for email notifications")

export const NotificationRequestSchema = z.object({
  type: NotificationTypeSchema,
  recipient: RecipientSchema,
  message: MessageSchema,
  subject: SubjectSchema,
})

export const NotificationResponseSchema = z.object({
  success: z
    .boolean()
    .describe("Whether the notification was sent successfully"),
  id: z.string().describe("Unique identifier of the notification"),
  response: z
    .record(z.unknown())
    .describe("Response from the notification service"),
})

export const ErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string().describe("Error message"),
})

export const InfobipMessageStatusSchema = z.object({
  groupId: z.number(),
  groupName: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export const InfobipMessageSchema = z.object({
  to: z.string(),
  messageId: z.string(),
  status: InfobipMessageStatusSchema,
})

export const InfobipResponseSchema = z.object({
  bulkId: z.string(),
  messages: z.array(InfobipMessageSchema),
})

export type NotificationType = z.infer<typeof NotificationTypeSchema>
export type NotificationRequest = z.infer<typeof NotificationRequestSchema>
export type NotificationResponse = z.infer<typeof NotificationResponseSchema>
export type ErrorResponse = z.infer<typeof ErrorSchema>
export type InfobipMessageStatus = z.infer<typeof InfobipMessageStatusSchema>
export type InfobipMessage = z.infer<typeof InfobipMessageSchema>
export type InfobipResponse = z.infer<typeof InfobipResponseSchema>

export interface Notification {
  id: string
  type: NotificationType
  recipient: string
  message: string
  subject?: string
  file?: Express.Multer.File
  createdAt: Date
}
