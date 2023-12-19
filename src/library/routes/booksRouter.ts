import { Router } from "express";
const router = Router();

import fileMulter from "../middleware/file";
import axios from "axios";
import { BookModel } from "../models/Book";
import container from "../container";
import BooksRepository from "../bookRepository";

router.get("/", async (req, res) => {
  try {
    const repo: BooksRepository = container.get(BooksRepository);
    const book = await repo.getBooks();
    res.render("books/index", {
      title: "Books",
      books: book
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const repo: BooksRepository = container.get(BooksRepository);
    const book = await repo.getBooks(id);
    axios.get(`http://counter:3001/counter/:${id}`).then((response) => {
      res.render("books/view", {
        title: "Book view",
        books: book[idx],
        views: response
      });
    });
    axios.post(`http://counter:3001/counter/:${id}/incr`).then((response) => {
      response.status(200).json({ status: ok });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body;

  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  });
  try {
    const repo: BooksRepository = container.get(BooksRepository);
    const book = await repo.createBook(newBook);
    await book.save();
    res.json(book);
    res.redirect("/api/books");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", fileMulter.single("fileBook"), async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body;
  const fileBook = req.file.path;
  try {
    const repo: BooksRepository = container.get(BooksRepository);
    const book = await repo.getBook(id);
    await book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    });
    res.redirect(`/api/books/${id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const repo: BooksRepository = container.get(BooksRepository);
    await repo.deleteOne({ _id: id });
    res.json(true);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
