const { catchAsync } = require('../middlewares/errorHandler');

// Sample users data
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user'
  }
];

// Get all users
const getAllUsers = catchAsync(async (req, res, next) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

module.exports = {
  getAllUsers
};
