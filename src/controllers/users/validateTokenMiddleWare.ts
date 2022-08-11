import { RequestHandler } from "express";
import { StatusError } from "../../errors";

const validateTokenMiddleWare: RequestHandler = (req, res, next) => {
  const hasToken = req.body.refreshToken;

  if (!hasToken) {
    const error = new StatusError("No refresh token", 401);

    next(error);
  } else {
    next();
  }
};

export default validateTokenMiddleWare;
