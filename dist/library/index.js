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
const express_1 = __importDefault(require("express"));
const booksRouter_1 = __importDefault(require("./routes/booksRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/api/books", booksRouter_1.default);
const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
function start(PORT, UrlDB) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(UrlDB);
            app.listen(PORT, () => {
                console.log("Library app is listening on http://localhost:3000/api/books");
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
start(PORT, UrlDB);
