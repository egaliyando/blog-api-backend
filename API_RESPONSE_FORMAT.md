# API Response Format

## Overview
Semua response API menggunakan format yang konsisten dan sederhana, hanya menampilkan informasi yang penting.

## Success Response

### Format
```json
{
  "success": true,
  "message": "Optional success message",
  "data": { ... },
  "count": 10
}
```

### Examples

#### Get All Posts
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "First Blog Post",
      "content": "Content here...",
      "author": "John Doe",
      "createdAt": "2025-10-28T..."
    }
  ]
}
```

#### Create Post
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 3,
    "title": "New Post",
    "content": "New content...",
    "author": "Jane Smith",
    "createdAt": "2025-10-28T..."
  }
}
```

## Error Response

### Format
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Development Mode
Di development mode, error response akan include stack trace:
```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Error: ...\n    at ..."
}
```

### Examples

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Title must be between 3 and 200 characters, Content is required"
}
```

#### Not Found (404)
```json
{
  "success": false,
  "message": "Post not found"
}
```

#### Route Not Found (404)
```json
{
  "success": false,
  "message": "Route not found"
}
```

#### Rate Limit (429)
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later",
  "retryAfter": 900
}
```

#### Internal Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 404 | Not Found | Resource or route not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side errors |

## Benefits

✅ **Konsisten**: Semua response mengikuti format yang sama  
✅ **Sederhana**: Hanya informasi penting yang ditampilkan  
✅ **Readable**: Mudah dibaca dan dipahami  
✅ **Client-Friendly**: Mudah di-parse oleh frontend  
✅ **Secure**: Tidak leak informasi sensitive di production  

## Response Fields

### Common Fields
- `success` (boolean): Indicates if request was successful
- `message` (string): Human-readable message
- `data` (object/array): The actual response data (success only)
- `count` (number): Total count for list responses (optional)
- `retryAfter` (number): Seconds to wait before retry (rate limit only)
- `stack` (string): Error stack trace (development only)

### Removed Fields
Fields yang **tidak** lagi digunakan untuk simplicity:
- ❌ `status` (fail/error)
- ❌ `isOperational`
- ❌ `error` object
- ❌ Nested error objects

## Testing

### Success
```bash
curl http://localhost:3000/api/posts
```

### Validation Error
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Hi"}'
```

### Not Found
```bash
curl http://localhost:3000/api/posts/999
```

### Route Not Found
```bash
curl http://localhost:3000/api/invalid-route
```
