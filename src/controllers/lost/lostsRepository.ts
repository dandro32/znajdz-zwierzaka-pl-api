import { Db, ObjectId } from "mongodb";
import { LostsRepository } from "../../models/lost";

const LOST_COLLECTION = "users_zz";

const lostsRepositoryFactory = (db: Db): LostsRepository => {
  const losts = db.collection(LOST_COLLECTION);

  return {
    async findOne(_id: string) {
      return losts.findOne({ _id });
    },
    async findAll() {
      return losts.find({}).toArray();
    },
    async create(lostData) {
      await losts.insertOne(lostData);
    },
    async updateOne(_id, updateData) {
      const updateDoc = {
        $set: updateData,
      };

      await losts.updateOne({ _id }, updateDoc);
    },
    async delete(id) {
      return losts.deleteOne({ _id: new ObjectId(id) });
    },
  };
};

export default lostsRepositoryFactory;
