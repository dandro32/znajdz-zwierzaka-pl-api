import { Request, Response, NextFunction } from "express";
import mapValues from "lodash.mapvalues";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const wrapWithTryCatch = (fn: AsyncHandler): AsyncHandler => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};

function withErrorHandling<T>(api: Record<keyof T, AsyncHandler>) {
  return mapValues(api, wrapWithTryCatch);
}

export default withErrorHandling;
