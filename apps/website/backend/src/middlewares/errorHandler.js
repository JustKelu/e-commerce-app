const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  // Log: in produzione va usato un logger strutturato (winston/pino)
  console.error(`[${statusCode}] ${err.message}`);

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
