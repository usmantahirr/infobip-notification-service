export const openApiDocument = {
  openapi: "3.0.0",
  info: {
    title: "Email Notification Service API",
    version: "1.0.0",
    description: "API documentation for the Email Notification Service",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/notifications/send": {
      post: {
        description: "Send a notification (email or SMS)",
        tags: ["Notifications"],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["type", "recipient", "message"],
                properties: {
                  type: {
                    type: "string",
                    enum: ["email", "sms"],
                    description: "Type of notification to send",
                  },
                  recipient: {
                    type: "string",
                    description:
                      "Email address or phone number of the recipient",
                  },
                  message: {
                    type: "string",
                    description: "Content of the notification",
                  },
                  subject: {
                    type: "string",
                    description:
                      "Subject line for email notifications (optional)",
                  },
                },
              },
              encoding: {
                attachment: {
                  contentType: "application/octet-stream",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Notification sent successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      description:
                        "Whether the notification was sent successfully",
                    },
                    id: {
                      type: "string",
                      description: "Unique identifier of the notification",
                    },
                    response: {
                      type: "object",
                      description: "Response from the notification service",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"],
                    },
                    message: {
                      type: "string",
                      description: "Error message",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["error"],
                    },
                    message: {
                      type: "string",
                      description: "Error message",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      NotificationRequest: {
        type: "object",
        required: ["type", "recipient", "message"],
        properties: {
          type: {
            type: "string",
            enum: ["email", "sms"],
            description: "Type of notification to send",
          },
          recipient: {
            type: "string",
            description: "Email address or phone number of the recipient",
          },
          message: {
            type: "string",
            description: "Content of the notification",
          },
          subject: {
            type: "string",
            description: "Subject line for email notifications (optional)",
          },
        },
      },
      NotificationResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Whether the notification was sent successfully",
          },
          id: {
            type: "string",
            description: "Unique identifier of the notification",
          },
          response: {
            type: "object",
            description: "Response from the notification service",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["error"],
          },
          message: {
            type: "string",
            description: "Error message",
          },
        },
      },
    },
  },
}
