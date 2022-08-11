import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateUser from "./validateUser";

const validateUserMiddleware: RequestHandler = (req, res, next) => {
  const message = validateUser(req.body);

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateUserMiddleware;
