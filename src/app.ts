import express from "express";
import cors from "cors";
import { Db } from "mongodb";

import { errorHandler, notFound } from "./errors";
import { usersRouteFactory } from "./routes";
import { API_ROUTE } from "./config";

export const appFactory = (db: Db) => {
  const app = express();
  const usersRoutes = usersRouteFactory(db);

  app.use(
    cors({
      credentials: true,
      origin: [],
    })
  );

  app.use(express.json());

  app.get("/", function (req, res, next) {
    res.send("Znajdz zwierzaka api is working");
  });

  app.use(API_ROUTE, usersRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
