// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.details,
    });
  }
  
  // Database errors
  if (err.name === 'DatabaseError') {
    return res.status(500).json({
      message: 'Database Error',
      details: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred with the database',
    });
  }
  
  // Return error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorHandler,
};