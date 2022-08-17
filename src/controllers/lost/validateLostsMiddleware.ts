import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateLost from "./validateLost";

const validateLostMiddleware: RequestHandler = (req, res, next) => {
  const message = validateLost(req.body);

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateLostMiddleware;
