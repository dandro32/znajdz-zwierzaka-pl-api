import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateAuthCredentials from "./validateAuthCredentials";

const validateAuthCredentialsMiddleware: RequestHandler = (req, res, next) => {
  const message = validateAuthCredentials(req.body);

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateAuthCredentialsMiddleware;
