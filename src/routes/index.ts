import { Router } from "express";
import { Db } from "mongodb";

import routes from "./config";
import { extractJWT } from "../middlewares";

import authControllerFactory from "../controllers/auth";
import authRepositoryFactory from "../controllers/auth/authRepository";
import lostControllerFactory from "../controllers/animal";
import lostsRepositoryFactory from "../controllers/animal/animalRepository";
import usersControllerFactory from "../controllers/users";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import validateAuthCredentialsMiddleware from "../controllers/auth/validateAuthCredentialsMiddleware";
import validateLostMiddleware from "../controllers/animal/validateAnimalsMiddleware";
import validateTokenMiddleWare from "../controllers/auth/validateTokenMiddleWare";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";
import animalsRepositoryFactory from "../controllers/animal/animalRepository";
import animalControllerFactory from "../controllers/animal";

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

const lostsRouteFactory = (db: Db) => {
  const collectionName = "zz_lost";
  const { LOSTS, LOST_DETAILS } = routes;
  const router: Router = Router();
  const lostsRepository = animalsRepositoryFactory(db, collectionName);
  const { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } =
    animalControllerFactory(lostsRepository);

  router.get(LOSTS, extractJWT, getAnimals);
  router.post(LOSTS, extractJWT, validateLostMiddleware, createAnimal);
  router.get(LOST_DETAILS, extractJWT, getAnimal);
  router.patch(LOST_DETAILS, extractJWT, validateLostMiddleware, updateAnimal);
  router.delete(LOST_DETAILS, extractJWT, deleteAnimal);

  return router;
};

const foundRouteFactory = (db: Db) => {
  const collectionName = "zz_found";
  const { FOUND, FOUND_DETAILS } = routes;
  const router: Router = Router();
  const foundRepository = animalsRepositoryFactory(db, collectionName);
  const { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } =
    animalControllerFactory(foundRepository);

  router.get(FOUND, extractJWT, getAnimals);
  router.post(FOUND, extractJWT, validateLostMiddleware, createAnimal);
  router.get(FOUND_DETAILS, extractJWT, getAnimal);
  router.patch(FOUND_DETAILS, extractJWT, validateLostMiddleware, updateAnimal);
  router.delete(FOUND_DETAILS, extractJWT, deleteAnimal);
  return router;
};

export {
  authRouteFactory,
  foundRouteFactory,
  lostsRouteFactory,
  usersRouteFactory,
};
