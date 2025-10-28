const { body, param, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return next(new AppError(errorMessages.join(', '), 400, ERROR_CODES.VALIDATION_ERROR));
  }
  
  next();
};

// Validate post creation
const validatePostCreation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .isLength({ min: 10, max: 10000 })
    .withMessage('Content must be between 10 and 10000 characters'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  
  handleValidationErrors
];

// Validate post update
const validatePostUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty')
    .isString()
    .withMessage('Content must be a string')
    .isLength({ min: 10, max: 10000 })
    .withMessage('Content must be between 10 and 10000 characters'),
  
  body('author')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Author cannot be empty')
    .isString()
    .withMessage('Author must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  
  // Custom validation to check if at least one field is provided
  body()
    .custom((value, { req }) => {
      if (!req.body.title && !req.body.content && !req.body.author) {
        throw new Error('At least one field (title, content, or author) must be provided');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validate ID parameter
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid ID parameter. ID must be a positive integer')
    .toInt(),
  
  handleValidationErrors
];

// Validate JSON body
const validateJSONBody = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return next(new AppError('Invalid JSON in request body', 400, ERROR_CODES.INVALID_JSON));
  }
  next();
};

module.exports = {
  validatePostCreation,
  validatePostUpdate,
  validateId,
  validateJSONBody,
  handleValidationErrors
};
