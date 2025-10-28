# Error Codes Documentation

## Overview
Setiap error response sekarang include error code yang jelas untuk memudahkan client mengidentifikasi dan menangani error dengan tepat.

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_HERE",
    "message": "Human-readable error message"
  }
}
```

## Available Error Codes

### Validation Errors (400)

#### `VALIDATION_ERROR`
Terjadi ketika input tidak memenuhi validasi yang ditentukan.

**Example:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hi"}'
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be between 3 and 200 characters, Content is required"
  }
}
```

#### `INVALID_INPUT`
Input data tidak valid atau format salah.

#### `MISSING_REQUIRED_FIELD`
Field yang required tidak disediakan.

#### `INVALID_JSON`
JSON syntax error di request body.

**Example:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{title: "Invalid JSON"}'
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_JSON",
    "message": "Invalid JSON in request body"
  }
}
```

---

### Authentication & Authorization (401, 403)

#### `UNAUTHORIZED`
User belum terautentikasi.

#### `FORBIDDEN`
User tidak memiliki permission untuk resource ini.

#### `INVALID_TOKEN`
Token tidak valid atau sudah expired.

#### `TOKEN_EXPIRED`
Token sudah kadaluarsa.

---

### Not Found (404)

#### `RESOURCE_NOT_FOUND`
Resource yang diminta tidak ditemukan.

**Example:**
```bash
curl http://localhost:3000/api/posts/999
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Post not found"
  }
}
```

#### `ROUTE_NOT_FOUND`
Endpoint/route tidak tersedia.

**Example:**
```bash
curl http://localhost:3000/api/invalid-route
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "ROUTE_NOT_FOUND",
    "message": "Route not found"
  }
}
```

---

### Conflict (409)

#### `CONFLICT`
Konflik dengan state resource saat ini.

#### `DUPLICATE_ENTRY`
Entry sudah ada (duplicate).

---

### Rate Limiting (429)

#### `RATE_LIMIT_EXCEEDED`
Terlalu banyak request dari IP ini.

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests from this IP, please try again later",
    "retryAfter": 900
  }
}
```

Note: `retryAfter` menunjukkan berapa detik harus menunggu sebelum retry.

---

### Server Errors (500)

#### `INTERNAL_SERVER_ERROR`
Error internal server yang tidak terduga.

#### `DATABASE_ERROR`
Error koneksi atau query database.

#### `SERVICE_UNAVAILABLE`
Service sementara tidak tersedia.

---

## Error Code Mapping

| HTTP Status | Error Code | Description |
|-------------|-----------|-------------|
| 400 | `VALIDATION_ERROR` | Input validation failed |
| 400 | `INVALID_INPUT` | Invalid input data |
| 400 | `INVALID_JSON` | Malformed JSON |
| 401 | `UNAUTHORIZED` | Authentication required |
| 403 | `FORBIDDEN` | Access denied |
| 404 | `RESOURCE_NOT_FOUND` | Resource not found |
| 404 | `ROUTE_NOT_FOUND` | Endpoint not found |
| 409 | `CONFLICT` | Resource conflict |
| 409 | `DUPLICATE_ENTRY` | Duplicate entry |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_SERVER_ERROR` | Server error |
| 500 | `DATABASE_ERROR` | Database error |
| 503 | `SERVICE_UNAVAILABLE` | Service down |

---

## Client Implementation Examples

### JavaScript/TypeScript
```javascript
try {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });
  
  const result = await response.json();
  
  if (!result.success) {
    const { code, message } = result.error;
    
    switch(code) {
      case 'VALIDATION_ERROR':
        showValidationErrors(message);
        break;
      case 'RESOURCE_NOT_FOUND':
        showNotFoundError();
        break;
      case 'RATE_LIMIT_EXCEEDED':
        showRateLimitError(result.error.retryAfter);
        break;
      default:
        showGenericError(message);
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### Python
```python
import requests

try:
    response = requests.post('http://localhost:3000/api/posts', 
                           json={'title': 'Test'})
    result = response.json()
    
    if not result['success']:
        error_code = result['error']['code']
        error_message = result['error']['message']
        
        if error_code == 'VALIDATION_ERROR':
            print(f"Validation failed: {error_message}")
        elif error_code == 'RESOURCE_NOT_FOUND':
            print("Resource not found")
        else:
            print(f"Error: {error_message}")
            
except requests.exceptions.RequestException as e:
    print(f"Network error: {e}")
```

---

## Benefits

✅ **Predictable**: Error codes konsisten dan mudah diprediksi  
✅ **Actionable**: Client bisa handle setiap error dengan tepat  
✅ **Machine-Readable**: Error codes mudah di-parse programmatically  
✅ **Debugging**: Lebih mudah tracking dan debugging issues  
✅ **Documentation**: Clear documentation untuk setiap error type  
✅ **Internationalization**: Message bisa ditranslate, code tetap sama  

---

## Usage in Code

### Creating Custom Errors

```javascript
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');

// Basic usage
throw new AppError('User not found', 404, ERROR_CODES.RESOURCE_NOT_FOUND);

// With default error code (based on status code)
throw new AppError('Invalid input', 400); // Auto: BAD_REQUEST

// Custom error code
throw new AppError('Email already exists', 409, ERROR_CODES.DUPLICATE_ENTRY);
```

### Available Error Codes Constant

```javascript
const ERROR_CODES = require('../utils/errorCodes');

ERROR_CODES.VALIDATION_ERROR
ERROR_CODES.RESOURCE_NOT_FOUND
ERROR_CODES.ROUTE_NOT_FOUND
ERROR_CODES.RATE_LIMIT_EXCEEDED
// ... dan lainnya
```

---

## Development Logging

Di development mode, error details tetap dicatat di console:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 ERROR DETAILS:
Code: VALIDATION_ERROR
Status: 400
Message: Title must be between 3 and 200 characters
Timestamp: 2025-10-28T10:30:45.123Z
Stack: Error: Title must be between...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Response ke client tetap bersih tanpa stack trace! 🎯
