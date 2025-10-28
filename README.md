# 📝 Blog API Backend

A simple RESTful API built with **Node.js** and **Express**, created as part of my Fullstack Developer roadmap journey.  
This project focuses on understanding backend fundamentals — including server setup, routing, middleware, and REST API design.

---

## 🚀 Features
- ✅ RESTful API with Express.js
- ✅ Comprehensive error handling with custom error codes
- ✅ Request validation using express-validator
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS support
- ✅ Environment variables configuration
- ✅ Structured error responses
- ✅ MVC pattern architecture
- ✅ In-memory data storage (ready for database integration)
- ✅ Development logging and debugging

---

## 🧩 Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **express-validator** - Input validation
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration
- **Nodemon** - Development auto-reload

---

## 📁 Project Structure
```
blog-api-backend/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── postController.js
│   │   └── userController.js
│   ├── routes/                # API routes
│   │   └── index.js
│   ├── middlewares/           # Custom middleware
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   ├── rateLimit.js
│   │   └── logger.js
│   ├── models/                # Data models (future)
│   ├── config/                # Configuration files (future)
│   ├── utils/                 # Utility functions
│   │   ├── AppError.js
│   │   └── errorCodes.js
│   └── server.js              # App entry point
├── .env                       # Environment variables (not in repo)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies & scripts
├── README.md                  # Project documentation
├── ERROR_CODES.md             # Error codes documentation
├── ERROR_HANDLING.md          # Error handling guide
├── EXPRESS_VALIDATOR.md       # Validation documentation
└── API_RESPONSE_FORMAT.md     # API response specs
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/egaliyando/blog-api-backend.git
cd blog-api-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=3000
NODE_ENV=development
```

4. **Run the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run at: `http://localhost:3000`

---

## 📌 API Endpoints

### Root
- `GET /` - Welcome message

### Health Check
- `GET /api/health` - API health status

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Users
- `GET /api/users` - Get all users

---

## 📝 API Request Examples

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

### Get Post by ID
```bash
curl http://localhost:3000/api/posts/1
```

### Create Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "This is the content of my blog post with enough characters.",
    "author": "John Doe"
  }'
```

### Update Post
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

### Delete Post
```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

---

## 📄 API Response Format

### Success Response
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be between 3 and 200 characters"
  }
}
```

For complete error codes documentation, see [ERROR_CODES.md](./ERROR_CODES.md)

---

## 🔒 Error Codes

Common error codes returned by the API:

- `VALIDATION_ERROR` - Input validation failed
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `ROUTE_NOT_FOUND` - Endpoint does not exist
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INVALID_JSON` - Malformed JSON in request body
- `INTERNAL_SERVER_ERROR` - Server error

See [ERROR_CODES.md](./ERROR_CODES.md) for complete documentation.

---

## 🧪 Testing

You can test the API using:
- **cURL** (command line)
- **Postman** (GUI)
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

---

## 📚 Documentation

- [ERROR_CODES.md](./ERROR_CODES.md) - Complete error codes reference
- [ERROR_HANDLING.md](./ERROR_HANDLING.md) - Error handling guide
- [EXPRESS_VALIDATOR.md](./EXPRESS_VALIDATOR.md) - Validation documentation
- [API_RESPONSE_FORMAT.md](./API_RESPONSE_FORMAT.md) - Response format specs

---

## 🚧 Roadmap

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Authorization & roles
- [ ] File upload support
- [ ] Pagination & filtering
- [ ] Unit & integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## 👨‍💻 Author

**Ega Liyando**
- GitHub: [@egaliyando](https://github.com/egaliyando)

---

## 📄 License

ISC

---

## 🙏 Acknowledgments

This project is part of my learning journey in fullstack development, focusing on building solid backend fundamentals with Node.js and Express.js.