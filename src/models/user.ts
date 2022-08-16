import { WithId, Document } from "mongodb";

export interface UserAddress {
  city?: string;
  phone?: string;
  postalCode?: string;
  street?: string;
}

export interface User {
  _id: string;
  address?: UserAddress;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(email: string, username: string): Promise<WithId<Document> | null>;
  create(credentials: User): Promise<void>;
  updateOne(email: string, updateValue: Partial<User>): Promise<void>;
  findByRefreshToken(token: string): Promise<WithId<Document> | null>;
}
