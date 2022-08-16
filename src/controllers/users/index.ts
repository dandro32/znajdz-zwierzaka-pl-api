import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";
import { StatusError } from "../../errors";
import { withErrorHandling } from "../../middlewares";

import { User, UsersRepository } from "../../models/user";

const usersControllerFactory = (usersRepository: UsersRepository) =>
  withErrorHandling({
    async getUsers(_: Request, res: Response, next: NextFunction) {
      try {
        const users = await usersRepository.findAll();

        res.json(users);
      } catch (e) {
        next(e);
      }
    },
    async getUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const users = await usersRepository.findOne(id);

        res.json(users);
      } catch (e) {
        next(e);
      }
    },
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const userData: User = req.body;

        await usersRepository.create(id, userData);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const userData: User = req.body;

        await usersRepository.updateOne(id, userData);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        await usersRepository.delete(id);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default usersControllerFactory;
