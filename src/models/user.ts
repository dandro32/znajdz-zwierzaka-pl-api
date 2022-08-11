import { WithId, Document } from "mongodb";

export interface CreateUser {
  username: string;
  password: string;
}

export interface User extends CreateUser {
  token: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(username: string): Promise<WithId<Document> | null>;
  create(credentials: User): Promise<void>;
  updateOne(username: string, updateValue: Partial<User>): Promise<void>;
  findByRefreshToken(token: string): Promise<WithId<Document> | null>;
}
