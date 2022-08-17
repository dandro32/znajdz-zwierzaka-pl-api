import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";
import { withErrorHandling } from "../../middlewares";

import { CreateAnimal, Animal, AnimalsRepository } from "../../models/animal";

const animalControllerFactory = (animalsRepository: AnimalsRepository) =>
  withErrorHandling({
    async getAnimals(_: Request, res: Response, next: NextFunction) {
      try {
        const animals = await animalsRepository.findAll();

        res.json(animals);
      } catch (e) {
        next(e);
      }
    },
    async getAnimal(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const animal = await animalsRepository.findOne(id);

        res.json(animal);
      } catch (e) {
        next(e);
      }
    },
    async createAnimal(req: Request, res: Response, next: NextFunction) {
      try {
        const data: CreateAnimal = req.body;

        await animalsRepository.create(data);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateAnimal(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const data: Animal = req.body;

        await animalsRepository.updateOne(id, data);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteAnimal(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        await animalsRepository.delete(id);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default animalControllerFactory;
