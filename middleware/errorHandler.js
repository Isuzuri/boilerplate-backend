export function errorHandler(error, req, res, next) {
  logger.error(`${error.message} | ${req.method} ${req.url}`);

  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
  });
}
