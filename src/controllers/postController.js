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
const getAllPosts = (req, res) => {
  try {
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
};

// Get post by ID
const getPostById = (req, res) => {
  try {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
};

// Create new post
const createPost = (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, content, and author'
      });
    }
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

// Update post
const updatePost = (req, res) => {
  try {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
};

// Delete post
const deletePost = (req, res) => {
  try {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    const deletedPost = posts.splice(postIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
