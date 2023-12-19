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
const redis_1 = __importDefault(require("redis"));
const app = (0, express_1.default)();
const REDIS_URL = process.env.REDIS_URL || "localhost";
const COUNTER_URL = process.env.COUNTER_URL || 3001;
const client = redis_1.default.createClient({ url: REDIS_URL });
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
}))();
app.get("/counter/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cnt = yield client.get(id);
    res.status(200).json({ count: cnt });
}));
app.post("/counter/:id/incr", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield client.incr(id);
    res.status(200).json({ message: `OK` });
}));
app.listen(COUNTER_URL, () => {
    console.log("Counter app is listening on port  http://localhost:3001");
});
