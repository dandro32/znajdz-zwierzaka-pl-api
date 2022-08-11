import { Db } from "mongodb";
import { UsersRepository } from "../../models/user";

const usersRepositoryFactory = (db: Db): UsersRepository => {
  const users = db.collection("users");

  return {
    async findOne(username) {
      return users.findOne({ username }, { projection: { _id: 0 } });
    },
    async findByRefreshToken(token) {
      return users.findOne({ token }, { projection: { _id: 0, password: 0 } });
    },
    async findAll() {
      return users
        .find({}, { projection: { _id: 0, password: 0, token: 0 } })
        .toArray();
    },
    async create(credentials) {
      await users.insertOne(credentials);
    },
    async updateOne(username, updateData) {
      const updateDoc = {
        $set: updateData,
      };

      await users.updateOne({ username }, updateDoc);
    },
  };
};

export default usersRepositoryFactory;
