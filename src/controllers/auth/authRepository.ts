import { Db } from "mongodb";
import { AuthRepository } from "../../models/auth";

const AUTH_USERS_COLLECTION = "auth_users_zz";

const authRepositoryFactory = (db: Db): AuthRepository => {
  const auth_users = db.collection(AUTH_USERS_COLLECTION);

  return {
    async findOne(username, email) {
      return auth_users.findOne(
        { email, username },
        { projection: { _id: 0 } }
      );
    },
    async findByRefreshToken(token) {
      return auth_users.findOne({ token }, { projection: { password: 0 } });
    },
    async findAll() {
      return auth_users
        .find({}, { projection: { password: 0, token: 0 } })
        .toArray();
    },
    async create(credentials) {
      await auth_users.insertOne(credentials);
    },
    async updateOne(_id, updateData) {
      const updateDoc = {
        $set: updateData,
      };

      await auth_users.updateOne({ _id }, updateDoc);
    },
  };
};

export default authRepositoryFactory;
