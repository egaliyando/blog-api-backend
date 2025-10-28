# Testing Guide - Blog API

## Overview
Panduan lengkap untuk testing semua endpoints API menggunakan cURL.

---

## Prerequisites
- Server running di `http://localhost:3000`
- Terminal dengan cURL installed
- (Optional) jq atau python3 untuk format JSON

---

## 1. Health Check

### Check API Status
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2025-10-28T11:09:19.280Z"
}
```

---

## 2. GET Endpoints

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "First Blog Post",
      "content": "This is the content...",
      "author": "John Doe",
      "createdAt": "2025-10-28T..."
    }
  ]
}
```

### Get Post by ID
```bash
curl http://localhost:3000/api/posts/1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "First Blog Post",
    "content": "This is the content...",
    "author": "John Doe",
    "createdAt": "2025-10-28T..."
  }
}
```

### Get Non-existent Post (Error Case)
```bash
curl http://localhost:3000/api/posts/999
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Post not found"
  }
}
```

---

## 3. POST Endpoint

### Create New Post (Success)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Blog Post",
    "content": "This is the content of my blog post with enough characters to pass validation.",
    "author": "Jane Smith"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 3,
    "title": "My Awesome Blog Post",
    "content": "This is the content...",
    "author": "Jane Smith",
    "createdAt": "2025-10-28T..."
  }
}
```

### Create Post with Validation Error
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hi",
    "content": "Short",
    "author": "J"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be between 3 and 200 characters, Content must be between 10 and 10000 characters, Author name must be between 2 and 100 characters"
  }
}
```

### Create Post with Missing Fields
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Content is required, Author is required"
  }
}
```

---

## 4. PUT Endpoint (Update)

### Update Post Title Only
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Post Title"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Post Title",
    "content": "Original content...",
    "author": "John Doe",
    "createdAt": "2025-10-28T...",
    "updatedAt": "2025-10-28T..."
  }
}
```

### Update Post Content Only
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is the new updated content with more information and details."
  }'
```

### Update Multiple Fields
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completely Updated Post",
    "content": "Brand new content for this amazing blog post with all the details.",
    "author": "Updated Author"
  }'
```

### Update with Validation Error
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AB"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be between 3 and 200 characters"
  }
}
```

### Update Non-existent Post
```bash
curl -X PUT http://localhost:3000/api/posts/999 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Post not found"
  }
}
```

### Update with No Fields (Error)
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "At least one field (title, content, or author) must be provided"
  }
}
```

---

## 5. DELETE Endpoint

### Delete Post (Success)
```bash
curl -X DELETE http://localhost:3000/api/posts/2
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": {
    "id": 2,
    "title": "Second Blog Post",
    "content": "This is the content...",
    "author": "Jane Smith",
    "createdAt": "2025-10-28T..."
  }
}
```

### Delete Non-existent Post
```bash
curl -X DELETE http://localhost:3000/api/posts/999
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Post not found"
  }
}
```

### Delete with Invalid ID
```bash
curl -X DELETE http://localhost:3000/api/posts/abc
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid ID parameter. ID must be a positive integer"
  }
}
```

---

## 6. Users Endpoint

### Get All Users
```bash
curl http://localhost:3000/api/users
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  ]
}
```

---

## 7. Error Cases

### Invalid JSON
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{title: "Invalid JSON"}'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_JSON",
    "message": "Invalid JSON in request body"
  }
}
```

### Route Not Found
```bash
curl http://localhost:3000/api/invalid-route
```

**Expected Response:**
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

## Testing with Pretty JSON Output

### Using Python
```bash
curl -s http://localhost:3000/api/posts | python3 -m json.tool
```

### Using jq (if installed)
```bash
curl -s http://localhost:3000/api/posts | jq
```

---

## Complete Test Flow Example

```bash
# 1. Get all posts
curl -s http://localhost:3000/api/posts | python3 -m json.tool

# 2. Create a new post
curl -s -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is test content with enough characters.",
    "author": "Test User"
  }' | python3 -m json.tool

# 3. Get the new post (assuming ID is 3)
curl -s http://localhost:3000/api/posts/3 | python3 -m json.tool

# 4. Update the post
curl -s -X PUT http://localhost:3000/api/posts/3 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Post"
  }' | python3 -m json.tool

# 5. Delete the post
curl -s -X DELETE http://localhost:3000/api/posts/3 | python3 -m json.tool

# 6. Verify deletion
curl -s http://localhost:3000/api/posts/3 | python3 -m json.tool
```

---

## HTTP Status Codes

| Status | Meaning | When |
|--------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation error |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Tips

1. **Use `-s` flag** untuk silent mode (no progress bar)
2. **Use `-v` flag** untuk verbose output (see headers)
3. **Save response to file**: `curl ... > response.json`
4. **See only headers**: `curl -I http://localhost:3000/api/posts`
5. **Measure time**: `curl -w "\nTime: %{time_total}s\n" ...`

---

## Automated Testing Script

Create a file `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "Testing Blog API..."
echo "===================="

# Test GET all posts
echo -e "\n1. GET all posts:"
curl -s $BASE_URL/posts | python3 -m json.tool

# Test POST create
echo -e "\n2. POST create post:"
curl -s -X POST $BASE_URL/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content here","author":"Tester"}' \
  | python3 -m json.tool

# Test PUT update
echo -e "\n3. PUT update post:"
curl -s -X PUT $BASE_URL/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}' \
  | python3 -m json.tool

# Test DELETE
echo -e "\n4. DELETE post:"
curl -s -X DELETE $BASE_URL/posts/2 | python3 -m json.tool

echo -e "\n\nTesting completed!"
```

Make it executable and run:
```bash
chmod +x test-api.sh
./test-api.sh
```
