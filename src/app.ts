import express from "express";
import cors from "cors";
import { Db } from "mongodb";

import { errorHandler, notFound } from "./errors";
import {
  authRouteFactory,
  usersRouteFactory,
  lostsRouteFactory,
} from "./routes";
import { API_ROUTE } from "./config";

export const appFactory = (db: Db) => {
  const app = express();
  const authRoutes = authRouteFactory(db);
  const usersRoutes = usersRouteFactory(db);
  const lostsRoutes = lostsRouteFactory(db);

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

  app.use(API_ROUTE, authRoutes);
  app.use(API_ROUTE, usersRoutes);
  app.use(API_ROUTE, lostsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
