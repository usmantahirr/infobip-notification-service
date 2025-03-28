# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security vulnerability, please follow these steps:

1. **Do not** open a public issue for the vulnerability
2. Email your findings to [INSERT SECURITY CONTACT EMAIL]
3. Provide detailed information about the vulnerability:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
4. We will acknowledge receipt within 48 hours
5. We will investigate and provide an initial response within 72 hours
6. We will keep you updated on the progress of fixing the vulnerability

## Security Best Practices

When using this service:

1. Always use HTTPS for API calls
2. Keep your API keys secure and never commit them to version control
3. Use environment variables for sensitive information
4. Regularly rotate your API keys
5. Monitor your usage for any suspicious activity

## Known Security Considerations

1. File Attachments:

   - Maximum file size is limited to 2MB
   - Only specific file types are allowed
   - Files are scanned for malware

2. Rate Limiting:

   - 100 requests per minute per IP
   - 1000 requests per hour per API key

3. Input Validation:
   - All inputs are validated using Zod schemas
   - Email addresses and phone numbers are strictly validated
   - File types and sizes are checked

## Security Updates

We regularly update dependencies to patch security vulnerabilities. To ensure you're using the latest secure version:

1. Keep your dependencies up to date
2. Run `npm audit` regularly
3. Subscribe to security advisories for this repository
