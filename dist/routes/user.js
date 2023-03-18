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
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("../library/logging"));
const user_1 = require("../services/user");
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const auth_1 = require("../middlewares/auth");
router.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Registering new user");
    const userService = new user_1.UserService();
    try {
        const { name, email, password } = request.body;
        if (!(name && email && password)) {
            return response
                .status(400)
                .json({ message: "please provide both email & password" });
        }
        const myFilter = { email: email };
        const existingUser = yield userService.findUser(myFilter);
        if (existingUser) {
            logging_1.default.error("User Already Exist. Please Login");
            return response.status(409).json({ message: "User already exist" });
        }
        const user = yield userService.register({
            name,
            email,
            password,
        });
        return response.status(200).json({ user, token: user.token });
    }
    catch (error) {
        logging_1.default.error(`Error in registering user`);
        return response.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(" user login");
    const userService = new user_1.UserService();
    try {
        const { email, password } = request.body;
        if (!(email && password)) {
            response.status(400).send("Email and Password required");
        }
        const myFilter = { email: email };
        const user = yield userService.findUser(myFilter);
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user.id, email }, config_1.config.token.TOKEN_KEY, {
                expiresIn: "7h",
            });
            user.token = token;
            return response.status(200).json(user);
        }
        else {
            return response.status(401).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        logging_1.default.error(`Error in user login`);
        return response.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/listAllUsers", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Listing all users");
    const userService = new user_1.UserService();
    try {
        const userList = yield userService.listAllUsers();
        if (userList.length > 0) {
            return response.status(200).send(userList);
        }
        else {
            return response.status(404).send({ message: "Users not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Internal server error`);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}));
module.exports = router;
