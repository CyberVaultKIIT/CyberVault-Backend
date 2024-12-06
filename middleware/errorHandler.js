function errorHandler(err, req, res, next) {

  var statusCode;
  var message;

  if (err.statusCode) {
    statusCode = err.statusCode;
  } else {
    statusCode = 500;
  }

  if (err.message) {
    message = err.message;
  } else {
    message = 'Internal Server Error';
  }

  console.error(err.stack);

  res.status(statusCode).json({
      success: false,
      error: {
          message: message,
          stack: err.stack,
      },
  });
}

module.exports = errorHandler;