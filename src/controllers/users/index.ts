import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_SECRET,
} from "../../config";
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
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        
        const { username, password, email }: CreateUser = req.body;

        const userExists = await usersRepository.findOne(email, username);

        if (userExists) {
          throw new StatusError(`User: ${username} already exists`, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = generateRefreshToken(username);

        await usersRepository.create({
          username,
          password: hashedPassword,
          token: refreshToken,
        });
        const accessToken = generateAccessToken(req.body);

        res.json({ username, accessToken, refreshToken });
      } catch (e) {
        next(e);
      }
    },
    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password } = req.body;
        const user = await usersRepository.findOne(username);

        if (!user) {
          throw new StatusError("User does not exists. Please register", 403);
        }

        const match = await bcrypt.compare(password, user?.password);
        if (!match) {
          throw new StatusError("Wrong password. Please try again", 403);
        }

        const accessToken = generateAccessToken(username);
        const refreshToken = generateRefreshToken(username);

        res.json({ username, accessToken, refreshToken });
      } catch (e) {
        next(e);
      }
    },
  });

export default usersControllerFactory;
