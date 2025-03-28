# Building a Production-Ready Notification Service: A Deep Dive into TypeScript, Express, and Infobip Integration

## Introduction

In today's digital landscape, reliable communication channels are crucial for any application. Whether it's sending transactional emails, marketing campaigns, or SMS notifications, having a robust notification system is essential. I recently developed a production-ready notification service that handles both email and SMS notifications using Infobip's API. This service is built with TypeScript and Express.js, focusing on type safety, scalability, and maintainability.

The key challenges I aimed to solve were:

- Ensuring reliable delivery of notifications
- Maintaining type safety across the entire stack
- Providing a clean, well-documented API
- Implementing robust error handling and monitoring
- Ensuring security and rate limiting

## Technology Choices and Reasoning

### TypeScript

**Why TypeScript?**

- Static typing helps catch errors at compile time
- Better IDE support with autocompletion and inline documentation
- Improved code maintainability and readability
- Type definitions provide self-documenting code
- Better refactoring capabilities

### Express.js

**Why Express.js?**

- Lightweight and flexible web framework
- Large ecosystem of middleware
- Easy to understand and maintain
- Great TypeScript support
- Perfect for building REST APIs
- Excellent performance for our use case

### Zod

**Why Zod?**

- Seamless integration with TypeScript
- Runtime type checking that matches TypeScript types
- Automatic OpenAPI schema generation
- Declarative API for schema definition
- Great error messages out of the box
- Active maintenance and community support

### Infobip

**Why Infobip?**

- Reliable messaging platform
- Support for both email and SMS
- Good documentation and SDK
- Competitive pricing
- Global reach
- High deliverability rates

### OpenAPI/Swagger

**Why OpenAPI?**

- Standard for API documentation
- Automatic client generation
- Interactive API documentation
- Great developer experience
- Industry standard for API design

## Technical Stack

The service is built with a modern, type-safe stack:

- **TypeScript**: For static typing and better developer experience
- **Express.js**: A lightweight, flexible web framework
- **Zod**: For runtime type validation and schema definition
- **Infobip**: A reliable messaging platform for both email and SMS
- **OpenAPI**: For API documentation and client generation
- **Winston**: For structured logging
- **Helmet**: For security headers
- **Express Rate Limit**: For API rate limiting

## Key Architectural Decisions

### 1. Type Safety and Validation

One of the core principles of this service is ensuring type safety at every level. I chose Zod for runtime validation because it provides excellent TypeScript integration and a declarative API for schema definition.

```typescript
// Define schemas with clear validation rules
export const NotificationTypeSchema = z
  .enum(["email", "sms"], {
    description: "Type of notification to send",
    required_error: "Notification type is required",
    invalid_type_error: "Notification type must be either 'email' or 'sms'",
  })
  .openapi("NotificationType")

// Complex validation with custom rules
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
```

This approach provides several benefits:

- Runtime type checking that matches TypeScript types
- Automatic OpenAPI schema generation
- Clear validation error messages
- Reusable validation rules

### 2. Service Layer Design

The service layer follows a clean architecture pattern, with clear separation of concerns and dependency injection:

```typescript
export class NotificationService {
  private emailService: EmailService
  private smsService: SmsService

  constructor() {
    this.emailService = new EmailService()
    this.smsService = new SmsService()
  }

  async sendNotification(notification: Notification): Promise<AxiosResponse> {
    try {
      if (notification.type === "email") {
        return await this.emailService.sendEmail(
          notification.recipient,
          notification.subject || "Fidamy Notification",
          notification.message,
          notification.file,
        )
      } else if (notification.type === "sms") {
        return await this.smsService.sendSms(
          notification.recipient,
          notification.message,
        )
      } else {
        throw new Error("Unsupported notification type")
      }
    } catch (error) {
      logger.error(`Error sending notification: ${error}`)
      throw error
    }
  }
}
```

This design:

- Makes the code more testable
- Allows for easy mocking in tests
- Provides clear separation of concerns
- Makes it easy to add new notification types in the future

### 3. Error Handling Strategy

A robust error handling system is crucial for a production service. I implemented a custom error handling system that provides consistent error responses and proper logging:

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational = true,
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class FileError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}
```

Benefits of this approach:

- Consistent error response format
- Proper HTTP status codes
- Operational vs programming error distinction
- Centralized error logging
- Easy to extend for new error types

### 4. Security Implementation

Security is a top priority for any production service. I implemented several security measures:

```typescript
// Security middleware setup
app.use(helmet())
app.use(cors())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
)

// File upload security
const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  },
})
```

Security features implemented:

- Helmet for security headers
- CORS configuration
- Rate limiting
- File upload restrictions
- Environment variable validation
- Input validation

### 5. API Documentation

Clear API documentation is essential for developer adoption. I used OpenAPI to generate comprehensive API documentation:

```typescript
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
  },
})
```

Benefits of this approach:

- Interactive API documentation
- Automatic client generation
- Clear request/response schemas
- Example requests and responses
- Easy to maintain and update

## Technical Challenges and Solutions

### 1. File Upload Handling

Handling file uploads securely and efficiently was a key challenge:

```typescript
// File upload configuration
const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  },
})
```

Solutions implemented:

- File size limits
- File type validation
- Secure file handling
- Clear error messages
- Multipart form data handling

### 2. Rate Limiting Implementation

Implementing effective rate limiting was crucial for API protection:

```typescript
// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})
```

Features:

- IP-based rate limiting
- Configurable time windows
- Custom error messages
- Memory-based storage
- Easy to extend for distributed systems

## Future Improvements

1. **Testing**

   - Add unit tests
   - Add integration tests
   - Add API tests
   - Add test coverage reporting

2. **CI/CD**

   - Add GitHub Actions workflow
   - Add automated testing
   - Add automated deployment
   - Add code quality checks

3. **Monitoring & Observability**

   - Add metrics collection
   - Add health check endpoints
   - Add performance monitoring
   - Add tracing

4. **Advanced Features**
   - Add caching layer
   - Add retry mechanisms
   - Add circuit breakers
   - Add queue system for notifications

## Conclusion

Building this notification service was an exercise in creating a production-ready, type-safe, and maintainable API. The combination of TypeScript, Express.js, and Zod provided a solid foundation for building a reliable service. The focus on security, error handling, and documentation ensures that the service is not just functional but also maintainable and developer-friendly.

Key takeaways:

- Type safety is crucial for maintainable code
- Clean architecture makes the code more testable
- Security should be built-in, not bolted on
- Documentation is essential for developer adoption
- Error handling should be consistent and informative

The service is now ready for production use, with clear paths for future improvements and scaling.
