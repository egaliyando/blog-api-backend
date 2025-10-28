# API Error Handling & Validation

## Error Handling

### Custom Error Class
- `AppError` class untuk operational errors
- Mendukung status code dan pesan error custom

### Global Error Handler
- Development mode: menampilkan full error details dan stack trace
- Production mode: hanya menampilkan safe error messages
- Automatic error catching dengan `catchAsync` wrapper

### Error Response Format
```json
{
  "success": false,
  "status": "fail|error",
  "message": "Error message here"
}
```

## Request Validation

### Post Validation
#### Create Post (`POST /api/posts`)
- **title**: Required, string, 3-200 characters
- **content**: Required, string, 10-10000 characters
- **author**: Required, string, 2-100 characters

#### Update Post (`PUT /api/posts/:id`)
- At least one field required
- Same validation rules as create
- Fields are optional but must meet requirements if provided

### ID Validation
- ID must be a positive number
- Applied to all routes with `:id` parameter

### JSON Validation
- Invalid JSON in request body returns 400 error
- Proper error message for syntax errors

## Rate Limiting

### Configuration
- **Window**: 15 minutes
- **Max Requests**: 100 per IP per window
- Automatic cleanup of old entries

### Rate Limit Response
```json
{
  "success": false,
  "status": "fail",
  "message": "Too many requests from this IP, please try again later",
  "retryAfter": 900
}
```

## Testing Examples

### Valid Request
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "This is a great blog post with enough content.",
    "author": "John Doe"
  }'
```

### Invalid Request (Title too short)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hi",
    "content": "This is a great blog post with enough content.",
    "author": "John Doe"
  }'
```

Response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Title must be at least 3 characters long"
}
```

### Invalid ID Parameter
```bash
curl http://localhost:3000/api/posts/abc
```

Response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid ID parameter. ID must be a positive number"
}
```

### Not Found Error
```bash
curl http://localhost:3000/api/posts/999
```

Response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Post not found"
}
```

## Files Structure

```
src/
├── utils/
│   └── AppError.js          # Custom error class
├── middlewares/
│   ├── errorHandler.js      # Global error handler & catchAsync
│   ├── validation.js        # Request validation middleware
│   └── rateLimit.js        # Rate limiting middleware
├── controllers/
│   ├── postController.js    # Updated with error handling
│   └── userController.js    # Updated with error handling
└── server.js               # Updated with all middlewares
```

## Benefits

✅ **Consistent Error Format**: All errors follow the same structure  
✅ **Input Sanitization**: Automatic trimming of whitespace  
✅ **Type Safety**: Validation ensures correct data types  
✅ **Security**: Rate limiting prevents abuse  
✅ **Developer Experience**: Clear error messages in development  
✅ **Production Ready**: Safe error messages in production  
