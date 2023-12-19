"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const file_1 = __importDefault(require("../middleware/file"));
const axios_1 = __importDefault(require("axios"));
const container_1 = __importDefault(require("../container"));
const bookRepository_1 = __importDefault(require("../bookRepository"));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = container_1.default.get(bookRepository_1.default);
        const book = yield repo.getBooks();
        res.render("books/index", {
            title: "Books",
            books: book
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(bookRepository_1.default);
        const book = yield repo.getBooks(id);
        axios_1.default.get(`http://counter:3001/counter/:${id}`).then((response) => {
            res.render("books/view", {
                title: "Book view",
                books: book[idx],
                views: response
            });
        });
        axios_1.default.post(`http://counter:3001/counter/:${id}/incr`).then((response) => {
            response.status(200).json({ status: ok });
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
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
        const repo = container_1.default.get(bookRepository_1.default);
        const book = yield repo.createBook(newBook);
        yield book.save();
        res.json(book);
        res.redirect("/api/books");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put("/:id", file_1.default.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const fileBook = req.file.path;
    try {
        const repo = container_1.default.get(bookRepository_1.default);
        const book = yield repo.getBook(id);
        yield book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        });
        res.redirect(`/api/books/${id}`);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(bookRepository_1.default);
        yield repo.deleteOne({ _id: id });
        res.json(true);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
