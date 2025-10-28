const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorHandler');
const { validateJSONBody } = require('./middlewares/validation');
const rateLimit = require('./middlewares/rateLimit');
const AppError = require('./utils/AppError');
const ERROR_CODES = require('./utils/errorCodes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON validation middleware
app.use(validateJSONBody);

// Import routes
const apiRoutes = require('./routes');

// Use routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blog API',
    version: '1.0.0',
    endpoints: {
      health: "/api/health",
      users: "/api/users",
      posts: "/api/posts",
    },
  });
});

// 404 handler
app.use((req, res, next) => {
  next(new AppError('Route not found', 404, ERROR_CODES.ROUTE_NOT_FOUND));
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
