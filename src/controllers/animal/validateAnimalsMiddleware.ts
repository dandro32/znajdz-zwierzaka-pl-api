import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateAnimal from "./validateAnimal";

const validateAnimalMiddleware: RequestHandler = (req, res, next) => {
  const message = validateAnimal(req.body);

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateAnimalMiddleware;
