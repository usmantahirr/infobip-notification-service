# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-28

### Added

- Initial release
- Email and SMS notification support via Infobip API
- OpenAPI documentation
- Rate limiting
- Request logging
- Input validation
- Error handling middleware
- Security middleware

### Features

- Send emails with attachments
- Send SMS messages
- File size limit of 2MB
- Supported file types: PDF, DOC, DOCX, JPG, PNG
- Rate limiting: 100 requests/minute per IP, 1000 requests/hour per API key
- API documentation with Swagger UI
- TypeScript support
- Express.js framework

### Security

- Input validation using Zod
- Rate limiting
- Security headers
- CORS configuration
- Environment variable validation
- File type and size restrictions

### Documentation

- OpenAPI documentation
- README
- Contributing guidelines
- Code of conduct
- Security policy
- Changelog

## Maintainers

- Usman Tahir <hello@usman.tahir.com>
