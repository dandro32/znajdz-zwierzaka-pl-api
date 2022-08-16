import { WithId, Document } from "mongodb";

export interface CreateUser {
  password: string;
  username: string;
  email: string;
  token: string;
}

export interface AuthUser extends CreateUser {
  _id: string;
}

export interface AuthRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(username: string, email?: string): Promise<WithId<Document> | null>;
  create(credentials: CreateUser): Promise<void>;
  updateOne(_id: string, updateValue: Partial<AuthUser>): Promise<void>;
  findByRefreshToken(token: string): Promise<WithId<Document> | null>;
}
