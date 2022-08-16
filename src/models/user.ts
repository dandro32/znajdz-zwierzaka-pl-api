import { WithId, Document } from "mongodb";

export interface AuthUser {
  password: string;
  token: string;
}

export interface UserAddress {
  city?: string;
  phone?: string;
  postalCode?: string;
  street?: string;
}

export interface User {
  username: string;
  address?: UserAddress;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(email: string): Promise<WithId<Document> | null>;
  create(credentials: User): Promise<void>;
  updateOne(email: string, updateValue: Partial<User>): Promise<void>;
  findByRefreshToken(token: string): Promise<WithId<Document> | null>;
}
