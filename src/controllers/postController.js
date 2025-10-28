const { catchAsync } = require('../middlewares/errorHandler');
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');

// Temporary in-memory storage (nanti bisa diganti dengan database)
let posts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    author: 'John Doe',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    author: 'Jane Smith',
    createdAt: new Date().toISOString()
  }
];

// Get all posts
const getAllPosts = catchAsync(async (req, res, next) => {
  res.json({
    success: true,
    count: posts.length,
    data: posts
  });
});

// Get post by ID
const getPostById = catchAsync(async (req, res, next) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return next(new AppError('Post not found', 404, ERROR_CODES.RESOURCE_NOT_FOUND));
  }
  
  res.json({
    success: true,
    data: post
  });
});

// Create new post
const createPost = catchAsync(async (req, res, next) => {
  const { title, content, author } = req.body;
  
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title,
    content,
    author,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
});

// Update post
const updatePost = catchAsync(async (req, res, next) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return next(new AppError('Post not found', 404, ERROR_CODES.RESOURCE_NOT_FOUND));
  }
  
  const { title, content, author } = req.body;
  
  posts[postIndex] = {
    ...posts[postIndex],
    ...(title && { title }),
    ...(content && { content }),
    ...(author && { author }),
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Post updated successfully',
    data: posts[postIndex]
  });
});

// Delete post
const deletePost = catchAsync(async (req, res, next) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return next(new AppError('Post not found', 404, ERROR_CODES.RESOURCE_NOT_FOUND));
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Post deleted successfully',
    data: deletedPost
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
