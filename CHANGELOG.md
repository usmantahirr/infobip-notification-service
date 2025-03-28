# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-28

### Added

- Initial release
- Email notification support with file attachments
- SMS notification support
- OpenAPI/Swagger documentation
- Rate limiting
- Request logging
- Input validation using Zod
- Error handling middleware
- Security middleware (Helmet, CORS)

### Features

- Support for sending emails with optional file attachments
- Support for sending SMS messages
- File size limit of 2MB for attachments
- Support for PDF, DOC, DOCX, JPG, PNG file types
- Rate limiting (100 requests/minute per IP, 1000/hour per API key)
- Comprehensive API documentation
- TypeScript support
- Express.js framework

### Security

- Input validation
- Rate limiting
- Helmet security headers
- CORS configuration
- Environment variable validation
- File type validation
- File size restrictions

### Documentation

- OpenAPI/Swagger documentation
- Comprehensive README
- Contributing guidelines
- Code of Conduct
- Security Policy
- Changelog
