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

import { CreateUser, AuthRepository } from "../../models/auth";

const generateAccessToken = (username: string): string => {
  return jwt.sign({ username }, JWT_ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (username: string): string => {
  return jwt.sign({ username }, JWT_REFRESH_SECRET, {
    algorithm: "HS256",
  });
};

const authControllerFactory = (authRepository: AuthRepository) =>
  withErrorHandling({
    async logout(req: Request, res: Response, next: NextFunction) {
      try {
        const username = req.params.username;
        await authRepository.updateOne(username, { token: "" });

        res.sendStatus(204);
      } catch (e) {
        next(e);
      }
    },
    async token(req: Request, res: Response, next: NextFunction) {
      try {
        const { refreshToken } = req.body;

        const user: any = await authRepository.findByRefreshToken(
          // TODO: handle any
          refreshToken
        );

        if (!user) {
          throw new StatusError("User does not exists", 403);
        }

        if (refreshToken !== user.token) {
          throw new StatusError("Wrong refresh token.", 403);
        }

        jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        const accessToken = generateAccessToken(user.username);

        res.json({ accessToken });
      } catch (e) {
        next(e);
      }
    },
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password, email }: CreateUser = req.body;

        const userExists = await authRepository.findOne(username, email);

        if (userExists) {
          throw new StatusError(`User: ${username} already exists`, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = generateRefreshToken(username);

        await authRepository.create({
          username,
          email,
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
        const { username, password, email } = req.body;
        const user = await authRepository.findOne(username);

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

export default authControllerFactory;
