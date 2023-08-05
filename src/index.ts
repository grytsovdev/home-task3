import express from "express";
import { db } from "./Config/db.config";
import { router } from "./Routes/note.routes";

const port = 5050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

db.then(() => {
  app.listen(port, () => console.log(`srever is listening on ${port}`));
});
