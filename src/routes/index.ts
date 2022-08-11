import { Router } from "express";
import { Db } from "mongodb";

import routes from "./config";
import { extractJWT } from "../middlewares";

import usersControllerFactory from "../controllers/users";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import validateTokenMiddleWare from "../controllers/users/validateTokenMiddleWare";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";

const usersRouteFactory = (db: Db) => {
  const { USERS, LOGIN, LOGOUT, TOKEN } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUsers, login, logout, token } =
    usersControllerFactory(usersRepository);

  router.post(TOKEN, validateTokenMiddleWare, token);
  router.post(LOGIN, validateUserMiddleware, login);
  router.delete(LOGOUT, extractJWT, logout);
  router.get(USERS, extractJWT, getUsers);
  router.post(USERS, validateUserMiddleware, createUser);

  return router;
};

export { usersRouteFactory };
