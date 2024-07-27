// Unsupported routes
const notFoundRoutes = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware to Handle Error
const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.status || 500).json({
    message: error.message || "An unknown error occurred",
  });
};

module.exports = { notFoundRoutes, errorHandler };
