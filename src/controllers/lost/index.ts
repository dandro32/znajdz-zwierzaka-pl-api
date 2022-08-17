import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";
import { withErrorHandling } from "../../middlewares";

import { CreateLost, Lost, LostsRepository } from "../../models/lost";

const lostControllerFactory = (lostsRepository: LostsRepository) =>
  withErrorHandling({
    async getLosts(_: Request, res: Response, next: NextFunction) {
      try {
        const losts = await lostsRepository.findAll();

        res.json(losts);
      } catch (e) {
        next(e);
      }
    },
    async getLost(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const lost = await lostsRepository.findOne(id);

        res.json(lost);
      } catch (e) {
        next(e);
      }
    },
    async createLost(req: Request, res: Response, next: NextFunction) {
      try {
        const data: CreateLost = req.body;

        await lostsRepository.create(data);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateLost(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const data: Lost = req.body;

        await lostsRepository.updateOne(id, data);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteLost(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        await lostsRepository.delete(id);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default lostControllerFactory;
