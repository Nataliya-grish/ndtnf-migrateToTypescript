import express from "express";
import router from "./routes/booksRouter";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/api/books", router);

const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;

async function start(PORT: any, UrlDB: any) {
  try {
    await mongoose.connect(UrlDB);
    app.listen(PORT, () => {
      console.log(
        "Library app is listening on http://localhost:3000/api/books"
      );
    });
  } catch (err) {
    console.log(err);
  }
}

start(PORT, UrlDB);
