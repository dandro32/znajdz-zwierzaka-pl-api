import { Db, ObjectId } from "mongodb";
import { AnimalsRepository } from "../../models/animal";

const animalsRepositoryFactory = (
  db: Db,
  collectionName: string
): AnimalsRepository => {
  const animals = db.collection(collectionName);

  return {
    async findOne(_id: string) {
      return animals.findOne({ _id });
    },
    async findAll() {
      return animals.find({}).toArray();
    },
    async create(animalData) {
      await animals.insertOne(animalData);
    },
    async updateOne(_id, updateData) {
      const updateDoc = {
        $set: updateData,
      };

      await animals.updateOne({ _id }, updateDoc);
    },
    async delete(id) {
      return animals.deleteOne({ _id: new ObjectId(id) });
    },
  };
};

export default animalsRepositoryFactory;
