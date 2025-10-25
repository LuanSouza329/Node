const AppError = require("../src/util/AppError");

function errorHandler(err, req, res, next) {
  if (!(err instanceof AppError)) {
    console.error("Erro inesperado", err);
    err = new AppError("Erro interno do servidor", 500);
  }
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    timestamp: new Date().toString(),
  })
}

module.exports = errorHandler;
