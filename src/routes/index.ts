import { Router } from "express";
import { Db } from "mongodb";

import routes from "./config";
import { extractJWT } from "../middlewares";

import usersControllerFactory from "../controllers/users";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import validateTokenMiddleWare from "../controllers/users/validateTokenMiddleWare";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";
import validateAuthCredentials from "../controllers/auth/validateAuthCredentials";
import validateAuthCredentialsMiddleware from "../controllers/auth/validateAuthCredentialsMiddleware";
import authControllerFactory from "../controllers/auth";
import authRepositoryFactory from "../controllers/auth/authRepository";

const usersRouteFactory = (db: Db) => {
  const { USERS, USER_DETAILS } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUser, getUsers, updateUser, deleteUser } =
    usersControllerFactory(usersRepository);

  router.get(USERS, extractJWT, getUsers);
  router.get(USER_DETAILS, extractJWT, getUser);
  router.post(USER_DETAILS, extractJWT, validateUserMiddleware, createUser);
  router.patch(USER_DETAILS, extractJWT, validateUserMiddleware, updateUser);
  router.delete(USER_DETAILS, extractJWT, deleteUser);

  return router;
};

const authRouteFactory = (db: Db) => {
  const { REGISTER, LOGIN, LOGOUT, TOKEN } = routes;
  const router: Router = Router();
  const authRepository = authRepositoryFactory(db);
  const { createUser, login, logout, token } =
    authControllerFactory(authRepository);

  router.post(TOKEN, validateTokenMiddleWare, token);
  router.post(LOGIN, validateAuthCredentialsMiddleware, login);
  router.delete(LOGOUT, extractJWT, logout);
  router.post(REGISTER, validateAuthCredentialsMiddleware, createUser);

  return router;
};

export { authRouteFactory, usersRouteFactory };
