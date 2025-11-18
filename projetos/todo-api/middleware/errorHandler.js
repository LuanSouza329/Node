import AppError from "../util/AppError.js";
export function errorHandler(err, req, res, next) {
  if (!(err instanceof AppError)) {
    err = new AppError("Erro interno do servidor", 500);
  }
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    timestamp: new Date().toString(),
  })
}


