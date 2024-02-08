import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default errorHandler;
