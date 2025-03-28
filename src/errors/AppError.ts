export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message)
    this.name = "ValidationError"
  }
}

export class NotificationError extends AppError {
  constructor(message: string) {
    super(500, message)
    this.name = "NotificationError"
  }
}

export class FileError extends AppError {
  constructor(message: string) {
    super(400, message)
    this.name = "FileError"
  }
}
