import { WithId, Document, DeleteResult } from "mongodb";

export interface CreateLost {
  additional?: string;
  color?: string;
  location: Location;
  race?: string;
  title: string;
  type: string;
  userId: string;
}

export interface Lost extends CreateLost {
  _id: string;
}

export interface LostsRepository {
  findAll(): Promise<WithId<Document>[]>;
  findOne(_id: string): Promise<WithId<Document> | null>;
  create(lostData: CreateLost): Promise<void>;
  updateOne(_id: string, updateValue: Partial<Lost>): Promise<void>;
  delete(_id: string): Promise<DeleteResult>;
}
