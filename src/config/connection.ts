import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI!;

export const connection = MongoClient.connect(url).then(function (client) {
    return client.db();
})