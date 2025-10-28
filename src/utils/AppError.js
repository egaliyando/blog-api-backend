// Custom error class
class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode || this.getDefaultErrorCode(statusCode);
    
    Error.captureStackTrace(this, this.constructor);
  }

  getDefaultErrorCode(statusCode) {
    const errorCodeMap = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      503: 'SERVICE_UNAVAILABLE'
    };
    
    return errorCodeMap[statusCode] || 'UNKNOWN_ERROR';
  }
}

module.exports = AppError;
