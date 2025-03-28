# Infobip Notification Service

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14.0.0-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-black.svg)](https://expressjs.com/)
[![Infobip](https://img.shields.io/badge/Infobip-API-orange.svg)](https://www.infobip.com/)

A robust TypeScript-based service for sending email and SMS notifications using Infobip's API. This service provides a simple and secure way to integrate Infobip's messaging capabilities into your applications.

## Technical Deep Dive

For a detailed technical overview of the project, including architecture decisions, technology choices, and implementation details, check out our [Technical Blog Post](TECHNICAL_BLOG.md). This comprehensive guide covers:

- Technology stack and reasoning behind each choice
- Architectural decisions and design patterns
- Security implementations and best practices
- Error handling strategies
- API documentation approach
- Technical challenges and solutions
- Future improvements and scaling considerations

## System Architecture

For a visual representation of the system architecture, including component relationships, data flow, and security implementation, check out our [Architecture Diagrams](ARCHITECTURE.md). The diagrams include:

- System overview and component relationships
- Request flow and processing
- Component architecture and dependencies
- Security implementation layers
- Error handling flow
- Data validation process

## Features

- 📧 Send email notifications with optional file attachments
- 📱 Send SMS notifications
- 📎 File attachment support for emails (PDF, DOC, DOCX, JPG, PNG)
- 🔒 Input validation using Zod
- 📝 OpenAPI/Swagger documentation
- 🚦 Rate limiting
- 📊 Request logging
- 🔍 Error handling and monitoring

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- An Infobip account for both email and SMS notifications

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/usmantahirr/infobip-notification-service.git
   cd infobip-notification-service
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Configure your Infobip credentials in `.env`:
   ```
   INFOBIP_API_KEY=your_api_key
   INFOBIP_BASE_URL=your_base_url
   INFOBIP_SENDER_EMAIL=your_verified_email
   INFOBIP_SENDER_NUMBER=your_sender_number
   ```

## Configuration

### Infobip Setup

1. Create an Infobip account
2. Generate an API key
3. Verify your sender email
4. Get your sender number for SMS
5. Add the credentials to your `.env` file

## Running the Service

### Development

```bash
npm run dev
# or
yarn dev
```

### Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

The service will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Documentation

Once the service is running, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

### Available Endpoints

#### Send Email

```
POST /notifications/email
Content-Type: multipart/form-data

{
  "type": "email",
  "recipient": "user@example.com",
  "subject": "Important Notification",
  "message": "This is an important email notification.",
  "attachment": [file] // Optional
}
```

#### Send SMS

```
POST /notifications/sms
Content-Type: application/json

{
  "type": "sms",
  "recipient": "+1234567890",
  "message": "Your verification code is: 123456"
}
```

## Rate Limiting

The service implements rate limiting to prevent abuse:

- 100 requests per minute per IP
- 1000 requests per hour per API key

## File Attachments

Email notifications support file attachments with the following specifications:

- Maximum file size: 2MB
- Supported formats: PDF, DOC, DOCX, JPG, PNG
- Only available for email notifications

## Error Handling

The service provides detailed error responses for various scenarios:

- 400: Invalid request parameters or validation errors
- 500: Internal server errors or service unavailability

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

For security concerns, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:

- Open an issue in the [GitHub repository](https://github.com/usmantahirr/infobip-notification-service/issues)
- Contact the maintainer at [hello@usman.tahir.com](mailto:hello@usman.tahir.com)

## Acknowledgments

- [Infobip](https://www.infobip.com/) for providing the messaging API
- [Express.js](https://expressjs.com/) for the web framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Zod](https://zod.dev/) for runtime type validation
