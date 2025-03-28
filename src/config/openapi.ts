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
  description: "Send an email notification",
  tags: ["Notifications"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: NotificationRequestSchema,
          encoding: {
            attachment: {
              contentType: "application/octet-stream",
            },
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
        },
      },
    },
    400: {
      description: "Invalid request parameters",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
})

registry.registerPath({
  method: "post",
  path: "/notifications/sms",
  description: "Send an SMS notification",
  tags: ["Notifications"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NotificationRequestSchema,
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
        },
      },
    },
    400: {
      description: "Invalid request parameters",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ErrorSchema,
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
    description: "API for sending email and SMS notifications",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
})
