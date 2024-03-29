// Error handling middleware
module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    error: err, // only send the development env
  });
};
