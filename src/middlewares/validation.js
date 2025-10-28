const AppError = require('../utils/AppError');

// Validate post creation
const validatePostCreation = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];

  // Validate title
  if (!title) {
    errors.push('Title is required');
  } else if (typeof title !== 'string') {
    errors.push('Title must be a string');
  } else if (title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.trim().length > 200) {
    errors.push('Title must not exceed 200 characters');
  }

  // Validate content
  if (!content) {
    errors.push('Content is required');
  } else if (typeof content !== 'string') {
    errors.push('Content must be a string');
  } else if (content.trim().length < 10) {
    errors.push('Content must be at least 10 characters long');
  } else if (content.trim().length > 10000) {
    errors.push('Content must not exceed 10000 characters');
  }

  // Validate author
  if (!author) {
    errors.push('Author is required');
  } else if (typeof author !== 'string') {
    errors.push('Author must be a string');
  } else if (author.trim().length < 2) {
    errors.push('Author name must be at least 2 characters long');
  } else if (author.trim().length > 100) {
    errors.push('Author name must not exceed 100 characters');
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join(', '), 400));
  }

  // Sanitize input
  req.body.title = title.trim();
  req.body.content = content.trim();
  req.body.author = author.trim();

  next();
};

// Validate post update
const validatePostUpdate = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];

  // Check if at least one field is provided
  if (!title && !content && !author) {
    return next(new AppError('At least one field (title, content, or author) must be provided', 400));
  }

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.push('Title must be a string');
    } else if (title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    } else if (title.trim().length > 200) {
      errors.push('Title must not exceed 200 characters');
    } else {
      req.body.title = title.trim();
    }
  }

  // Validate content if provided
  if (content !== undefined) {
    if (typeof content !== 'string') {
      errors.push('Content must be a string');
    } else if (content.trim().length < 10) {
      errors.push('Content must be at least 10 characters long');
    } else if (content.trim().length > 10000) {
      errors.push('Content must not exceed 10000 characters');
    } else {
      req.body.content = content.trim();
    }
  }

  // Validate author if provided
  if (author !== undefined) {
    if (typeof author !== 'string') {
      errors.push('Author must be a string');
    } else if (author.trim().length < 2) {
      errors.push('Author name must be at least 2 characters long');
    } else if (author.trim().length > 100) {
      errors.push('Author name must not exceed 100 characters');
    } else {
      req.body.author = author.trim();
    }
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join(', '), 400));
  }

  next();
};

// Validate ID parameter
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return next(new AppError('Invalid ID parameter. ID must be a positive number', 400));
  }
  
  req.params.id = id;
  next();
};

// Validate JSON body
const validateJSONBody = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return next(new AppError('Invalid JSON in request body', 400));
  }
  next();
};

module.exports = {
  validatePostCreation,
  validatePostUpdate,
  validateId,
  validateJSONBody
};
