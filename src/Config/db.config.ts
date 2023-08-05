import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const username = process.env.username;
const password = process.env.password;
const dbName = "notes-app";

const connectionString = `mongodb+srv://${username}:${password}@cluster0.aqews1f.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

export const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
