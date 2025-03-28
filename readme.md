# Infobip Notification Service

A TypeScript-based service for sending email and SMS notifications using Infobip's API. This service provides a simple and secure way to integrate Infobip's messaging capabilities into your applications.

## 📚 Documentation

For detailed documentation, please visit our [Wiki](https://github.com/usmantahirr/infobip-notification-service/wiki):

- [Architecture Overview](https://github.com/usmantahirr/infobip-notification-service/wiki/Architecture-Overview)
- [API Documentation](https://github.com/usmantahirr/infobip-notification-service/wiki/API-Documentation)
- [Deployment Guide](https://github.com/usmantahirr/infobip-notification-service/wiki/Deployment-Guide)
- [Contributing Guidelines](https://github.com/usmantahirr/infobip-notification-service/wiki/Contributing-Guidelines)
- [FAQ](https://github.com/usmantahirr/infobip-notification-service/wiki/FAQ)

## 🚀 Quick Start

1. Install the package:

   ```bash
   npm install infobip-notification-service
   ```

2. Initialize the client:

   ```javascript
   const { NotificationService } = require("infobip-notification-service")

   const client = new NotificationService({
     apiKey: "YOUR_API_KEY",
     baseUrl: "YOUR_BASE_URL",
   })
   ```

3. Send notifications:

   ```javascript
   // Send SMS
   await client.sendSMS({
     recipient: "+1234567890",
     message: "Your verification code is: 123456",
   })

   // Send Email
   await client.sendEmail({
     recipient: "user@example.com",
     subject: "Welcome",
     message: "Welcome to our platform!",
   })
   ```

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Documentation**: OpenAPI/Swagger
- **Logging**: Winston
- **Security**: Helmet, CORS
- **API**: Infobip

## 🔧 Configuration

Create a `.env` file with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000

# Infobip
INFOBIP_API_KEY=your_api_key
INFOBIP_BASE_URL=your_base_url
INFOBIP_SENDER_EMAIL=your_verified_sender_email
INFOBIP_SENDER_NUMBER=your_sender_number

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/usmantahirr/infobip-notification-service.git
   cd infobip-notification-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment:

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Start the service:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/usmantahirr/infobip-notification-service/wiki/Contributing-Guidelines) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- [GitHub Issues](https://github.com/usmantahirr/infobip-notification-service/issues)
- [Documentation](https://github.com/usmantahirr/infobip-notification-service/wiki/Home)
- [API Reference](https://github.com/usmantahirr/infobip-notification-service/wiki/API-Documentation)
- Email: support@your-domain.com

## 🙏 Acknowledgments

- Infobip for providing the messaging API
- Express.js for the web framework
- TypeScript for type safety
- Zod for runtime type validation
- All contributors to this project

---

<div align="center">
  <p>Built with ❤️ by Usman Tahir</p>
  <p>Last updated: March 2025</p>
</div>
