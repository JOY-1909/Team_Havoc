const authService = require('../services/authService');
const { ApiError } = require('../utils/errors');
const { asyncHandler } = require('./errorHandler');
const { logger } = require('../utils/logger');

const auth = asyncHandler(async (req, res, next) => {
  // BYPASS AUTHENTICATION
  req.user = {
    _id: '507f1f77bcf86cd799439011', // Dummy ObjectID to satisfy Mongoose
    email: 'bypass@example.com',
    role: 'admin',
    isActive: true
  };
  logger.info('Authentication bypassed: Using dummy user');
  next();
});

// Admin role verification - bypassed
const requireAdmin = asyncHandler(async (req, res, next) => {
  // Always allow in bypass mode
  next();
});

// Resource ownership verification - bypassed
const requireOwnership = (Model, paramName = 'id') => {
  return asyncHandler(async (req, res, next) => {
    // Always allow in bypass mode
    next();
  });
};

module.exports = {
  auth,
  requireAdmin,
  requireOwnership
};