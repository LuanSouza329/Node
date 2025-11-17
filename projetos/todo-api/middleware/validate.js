import { validationResult }  from "express-validator";
import AppError from "../util/AppError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => err.msg).join(", ");
    return res.status(200).json({
      message: message
    })
  }
  next();
};

/* next(new AppError(message, 400)); */