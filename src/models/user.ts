import { WithId, Document } from "mongodb";

export interface CreateUser {
  username: string;
  password: string;
}

export interface User extends CreateUser {
  address?: string;
  city?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  postalCode?: string;
  token: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(email: string): Promise<WithId<Document> | null>;
  create(credentials: User): Promise<void>;
  updateOne(email: string, updateValue: Partial<User>): Promise<void>;
  findByRefreshToken(token: string): Promise<WithId<Document> | null>;
}
