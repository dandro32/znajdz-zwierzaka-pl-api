import { WithId, Document, DeleteResult } from "mongodb";
import { ILocation } from "./location";

export interface CreateAnimal {
  additional?: string;
  color?: string;
  location: ILocation;
  race?: string;
  title: string;
  type: string;
  userId: string;
}

export interface Animal extends CreateAnimal {
  _id: string;
}

export interface AnimalsRepository {
  findAll(): Promise<WithId<Document>[]>;
  findOne(_id: string): Promise<WithId<Document> | null>;
  create(data: CreateAnimal): Promise<void>;
  updateOne(_id: string, updateValue: Partial<Animal>): Promise<void>;
  delete(_id: string): Promise<DeleteResult>;
}
