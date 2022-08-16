import { WithId, Document, DeleteResult } from "mongodb";

export interface UserContact {
  city?: string;
  phone?: string;
  postalCode?: string;
  street?: string;
}

export interface User {
  _id: string;
  contact?: UserContact;
  firstName: string;
  lastName: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(_id: string): Promise<WithId<Document> | null>;
  create(_id: string, userData: User): Promise<void>;
  updateOne(_id: string, updateValue: Partial<User>): Promise<void>;
  delete(_id: string): Promise<DeleteResult>;
}
