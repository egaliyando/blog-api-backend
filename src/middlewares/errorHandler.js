const AppError = require('../utils/AppError');

// Global error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';

  // Log error untuk debugging (tampil di console/terminal)
  if (process.env.NODE_ENV === 'development') {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('🔴 ERROR DETAILS:');
    console.error('Code:', errorCode);
    console.error('Status:', statusCode);
    console.error('Message:', message);
    console.error('Timestamp:', new Date().toISOString());
    if (err.stack) {
      console.error('Stack:', err.stack);
    }
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } else if (statusCode === 500) {
    // Log 500 errors di production juga
    console.error('ERROR 💥', {
      code: errorCode,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Response dengan error code yang jelas
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message
    }
  });
};

// Handle async errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  errorHandler,
  catchAsync,
  AppError
};
