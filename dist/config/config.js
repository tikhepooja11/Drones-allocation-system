"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "pooja";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "pooja123";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.sygdhbi.mongodb.net/myFirstDatabase`;
const SERVER_PORT = process.env.SERVER_port
    ? Number(process.env.SERVER_PORT)
    : 1338;
const TOKEN_KEY = "secret123";
//  now export this constants const config() FOR mongoDB connection
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
    token: {
        TOKEN_KEY,
    },
};
