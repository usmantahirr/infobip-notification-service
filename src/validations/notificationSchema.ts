import { z } from "zod"

export const notificationSchema = z.object({
  type: z.enum(["email", "sms"], {
    required_error: "Notification type is required",
    invalid_type_error: "Notification type must be either 'email' or 'sms'",
  }),
  recipient: z
    .string({
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
    ),
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(1, "Message cannot be empty"),
  subject: z.string().optional(),
})

export type NotificationInput = z.infer<typeof notificationSchema>
