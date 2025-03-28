import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi"

import {
  ErrorSchema,
  MessageSchema,
  NotificationRequestSchema,
  NotificationResponseSchema,
  NotificationTypeSchema,
  RecipientSchema,
  SubjectSchema,
} from "../schemas"

const registry = new OpenAPIRegistry()

registry.register("NotificationType", NotificationTypeSchema)
registry.register("Recipient", RecipientSchema)
registry.register("Message", MessageSchema)
registry.register("Subject", SubjectSchema)
registry.register("NotificationRequest", NotificationRequestSchema)
registry.register("NotificationResponse", NotificationResponseSchema)
registry.register("Error", ErrorSchema)

registry.registerPath({
  method: "post",
  path: "/notifications/email",
  description: "Send an email notification with optional file attachment",
  tags: ["Notifications"],
  summary: "Send Email",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: NotificationRequestSchema,
          encoding: {
            attachment: {
              contentType: "application/octet-stream",
              description: "Optional file attachment (max 2MB)",
            },
          },
          example: {
            type: "email",
            recipient: "user@example.com",
            subject: "Important Notification",
            message: "This is an important email notification.",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Email sent successfully",
      content: {
        "application/json": {
          schema: NotificationResponseSchema,
          example: {
            success: true,
            id: "123e4567-e89b-12d3-a456-426614174000",
            response: {
              messageId: "msg-123",
              status: "DELIVERED",
            },
          },
        },
      },
    },
    400: {
      description: "Invalid request parameters or validation error",
      content: {
        "application/json": {
          schema: ErrorSchema,
          example: {
            status: "error",
            message: "Invalid email format or missing required fields",
          },
        },
      },
    },
    500: {
      description: "Internal server error or service unavailable",
      content: {
        "application/json": {
          schema: ErrorSchema,
          example: {
            status: "error",
            message: "Failed to send email due to service error",
          },
        },
      },
    },
  },
})

registry.registerPath({
  method: "post",
  path: "/notifications/sms",
  description: "Send an SMS notification to a phone number",
  tags: ["Notifications"],
  summary: "Send SMS",
  request: {
    body: {
      content: {
        "application/json": {
          schema: NotificationRequestSchema,
          example: {
            type: "sms",
            recipient: "+1234567890",
            message: "Your verification code is: 123456",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "SMS sent successfully",
      content: {
        "application/json": {
          schema: NotificationResponseSchema,
          example: {
            success: true,
            id: "123e4567-e89b-12d3-a456-426614174000",
            response: {
              messageId: "msg-123",
              status: "DELIVERED",
            },
          },
        },
      },
    },
    400: {
      description: "Invalid request parameters or validation error",
      content: {
        "application/json": {
          schema: ErrorSchema,
          example: {
            status: "error",
            message: "Invalid phone number format or missing required fields",
          },
        },
      },
    },
    500: {
      description: "Internal server error or service unavailable",
      content: {
        "application/json": {
          schema: ErrorSchema,
          example: {
            status: "error",
            message: "Failed to send SMS due to service error",
          },
        },
      },
    },
  },
})

const generator = new OpenApiGeneratorV3(registry.definitions)
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Notification Service API",
    version: "1.0.0",
    description: `API for sending email and SMS notifications.

## Features
- Send email notifications with optional file attachments
- Send SMS notifications to phone numbers
- File size limit: 2MB
- Support for both email and phone number formats
- Detailed error responses

## Authentication
This API requires authentication using an API key.

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per API key

## File Attachments
- Supported formats: PDF, DOC, DOCX, JPG, PNG
- Maximum file size: 2MB
- Only available for email notifications`,
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://api.example.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "Notifications",
      description: "Endpoints for sending email and SMS notifications",
    },
  ],
})
