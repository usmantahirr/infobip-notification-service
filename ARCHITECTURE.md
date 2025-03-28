# System Architecture

This document provides visual representations of the Infobip Notification Service architecture using Mermaid.js diagrams.

## System Overview

```mermaid
graph TB
    Client[Client Application] -->|HTTP Request| API[API Layer]
    API -->|Validate| Validator[Input Validator]
    API -->|Rate Limit| RateLimiter[Rate Limiter]
    API -->|Log| Logger[Request Logger]

    Validator -->|Valid Request| Service[Notification Service]
    RateLimiter -->|Within Limits| Service
    Logger -->|Log Request| Service

    Service -->|Email| EmailService[Email Service]
    Service -->|SMS| SMSService[SMS Service]

    EmailService -->|Send| Infobip[Infobip API]
    SMSService -->|Send| Infobip

    style Client fill:#f9f,stroke:#333,stroke-width:2px
    style API fill:#bbf,stroke:#333,stroke-width:2px
    style Service fill:#bfb,stroke:#333,stroke-width:2px
    style Infobip fill:#fbb,stroke:#333,stroke-width:2px
```

## Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Validator
    participant Service
    participant Infobip

    Client->>API: Send Notification Request
    API->>Validator: Validate Input
    Validator-->>API: Validation Result

    alt Valid Request
        API->>Service: Process Request
        Service->>Infobip: Send via API
        Infobip-->>Service: Response
        Service-->>API: Success Response
        API-->>Client: 200 OK
    else Invalid Request
        Validator-->>API: Validation Error
        API-->>Client: 400 Bad Request
    end
```

## Component Architecture

```mermaid
classDiagram
    class NotificationService {
        -emailService: EmailService
        -smsService: SMSService
        +sendNotification(notification: Notification)
    }

    class EmailService {
        -apiKey: string
        -baseUrl: string
        +sendEmail(recipient: string, subject: string, message: string, attachment?: File)
    }

    class SMSService {
        -apiKey: string
        -baseUrl: string
        +sendSMS(recipient: string, message: string)
    }

    class NotificationRequestSchema {
        +type: NotificationType
        +recipient: string
        +message: string
        +subject?: string
        +attachment?: File
    }

    NotificationService --> EmailService
    NotificationService --> SMSService
    NotificationService --> NotificationRequestSchema
```

## Security Architecture

```mermaid
graph LR
    Request[Incoming Request] -->|1. Security Headers| Helmet[Helmet Middleware]
    Request -->|2. Rate Limiting| RateLimit[Rate Limiter]
    Request -->|3. CORS| CORS[CORS Middleware]
    Request -->|4. File Upload| FileCheck[File Validator]

    Helmet -->|Valid| Next[Next Middleware]
    RateLimit -->|Within Limits| Next
    CORS -->|Allowed Origin| Next
    FileCheck -->|Valid File| Next

    Next -->|Process| Handler[Request Handler]

    style Request fill:#f9f,stroke:#333,stroke-width:2px
    style Handler fill:#bfb,stroke:#333,stroke-width:2px
```

## Error Handling Flow

```mermaid
graph TD
    Error[Error Occurs] -->|Catch| Handler[Error Handler]
    Handler -->|Check Type| Type{Error Type?}

    Type -->|Validation| Validation[Validation Error]
    Type -->|File| File[File Error]
    Type -->|Operational| Operational[Operational Error]
    Type -->|Unknown| Unknown[Unknown Error]

    Validation -->|400| Response[Error Response]
    File -->|400| Response
    Operational -->|500| Response
    Unknown -->|500| Response

    Response -->|Log| Logger[Error Logger]
    Response -->|Send| Client[Client]

    style Error fill:#f99,stroke:#333,stroke-width:2px
    style Response fill:#9f9,stroke:#333,stroke-width:2px
```

## Data Validation Flow

```mermaid
graph LR
    Input[Raw Input] -->|Parse| Parser[Request Parser]
    Parser -->|Validate| Zod[Zod Schema]

    Zod -->|Valid| Type[TypeScript Types]
    Zod -->|Invalid| Error[Validation Error]

    Type -->|Use| Service[Service Layer]
    Error -->|Handle| Handler[Error Handler]

    style Input fill:#f9f,stroke:#333,stroke-width:2px
    style Type fill:#bfb,stroke:#333,stroke-width:2px
    style Error fill:#f99,stroke:#333,stroke-width:2px
```

These diagrams provide a visual representation of:

1. Overall system architecture and component relationships
2. Request flow and processing
3. Component architecture and dependencies
4. Security implementation layers
5. Error handling flow
6. Data validation process

The diagrams are created using Mermaid.js and can be viewed directly on GitHub, which supports Mermaid.js rendering.
