import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config";
import { StatusError } from "../errors";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1]; // Remove bearer

  if (!token) {
    throw new StatusError("No authorization token", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    res.locals.jwt = decoded;
  } catch (err) {
    const error = new StatusError(err as string, 403);

    next(error);
  }

  next();
};

export default extractJWT;
