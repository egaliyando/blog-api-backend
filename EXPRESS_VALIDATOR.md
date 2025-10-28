# Express-Validator Implementation

## Overview
Validation middleware telah diubah dari manual validation menjadi menggunakan library **express-validator** untuk validasi yang lebih robust dan maintainable.

## Benefits of express-validator

✅ **Declarative**: Validasi lebih mudah dibaca dan dipahami  
✅ **Chain-able**: Aturan validasi dapat di-chain dengan mudah  
✅ **Built-in Sanitization**: Automatic trimming dan type conversion  
✅ **Better Error Messages**: Error messages yang lebih jelas  
✅ **Widely Used**: Standard industry untuk Express.js validation  

## Validation Rules

### POST /api/posts (Create)
```javascript
validatePostCreation = [
  body('title')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 200 }),
  
  body('content')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 10, max: 10000 }),
  
  body('author')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 })
]
```

### PUT /api/posts/:id (Update)
```javascript
validatePostUpdate = [
  body('title').optional()
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 200 }),
  
  body('content').optional()
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 10, max: 10000 }),
  
  body('author').optional()
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 }),
  
  // At least one field required
  body().custom((value, { req }) => {
    if (!req.body.title && !req.body.content && !req.body.author) {
      throw new Error('At least one field must be provided');
    }
    return true;
  })
]
```

### ID Parameter Validation
```javascript
validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid ID parameter. ID must be a positive integer')
    .toInt()
]
```

## Usage in Routes

```javascript
const { 
  validatePostCreation, 
  validatePostUpdate, 
  validateId 
} = require('../middlewares/validation');

// Array of middleware
router.post('/posts', validatePostCreation, postController.createPost);
router.put('/posts/:id', validateId, validatePostUpdate, postController.updatePost);
router.get('/posts/:id', validateId, postController.getPostById);
```

## Error Response Format

```json
{
  "success": false,
  "status": "fail",
  "message": "Title is required, Content must be between 10 and 10000 characters"
}
```

## Testing Examples

### Valid Request
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "This is a great blog post with enough content to meet the minimum requirement.",
    "author": "John Doe"
  }'
```

### Invalid Request - Multiple Errors
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hi",
    "content": "Short",
    "author": "J"
  }'
```

Response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Title must be between 3 and 200 characters, Content must be between 10 and 10000 characters, Author name must be between 2 and 100 characters"
}
```

### Invalid ID
```bash
curl http://localhost:3000/api/posts/abc
```

Response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid ID parameter. ID must be a positive integer"
}
```

## Key Features

1. **Automatic Trimming**: Whitespace otomatis di-trim dari input
2. **Type Conversion**: ID parameter otomatis dikonversi ke integer
3. **Optional Fields**: Support untuk field optional dengan `.optional()`
4. **Custom Validation**: Support untuk custom validation logic
5. **Multiple Validators**: Bisa chain multiple validators per field
6. **Clear Error Messages**: Error messages yang deskriptif dan jelas

## Dependencies

```json
{
  "express-validator": "^7.x.x"
}
```

Install with:
```bash
npm install express-validator
```
