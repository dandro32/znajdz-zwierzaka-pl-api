import { Db, ObjectId } from "mongodb";
import { User, UsersRepository } from "../../models/user";

const USERS_COLLECTION = "users_zz";

const usersRepositoryFactory = (db: Db): UsersRepository => {
  const users = db.collection(USERS_COLLECTION);

  return {
    async findOne(_id: string) {
      return users.findOne({ _id });
    },
    async findAll() {
      return users
        .find({}, { projection: { _id: 0, password: 0, token: 0 } })
        .toArray();
    },
    async create(id, userData) {
      await users.insertOne({ ...userData, _id: new ObjectId(id) });
    },
    async updateOne(_id, updateData) {
      const updateDoc = {
        $set: updateData,
      };

      await users.updateOne({ _id }, updateDoc);
    },
    async delete(id) {
      return users.deleteOne({ _id: new ObjectId(id) });
    },
  };
};

export default usersRepositoryFactory;
