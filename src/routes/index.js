const express = require("express");
const router = express.Router();
const {
  validatePostCreation,
  validatePostUpdate,
  validateId,
} = require("../middlewares/validation");

// Import controllers
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// Post routes
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", validateId, postController.getPostById);
router.post("/posts", validatePostCreation, postController.createPost);
router.put(
  "/posts/:id",
  validateId,
  validatePostUpdate,
  postController.updatePost
);
router.delete("/posts/:id", validateId, postController.deletePost);

// User routes
router.get("/users", userController.getAllUsers);

module.exports = router;
