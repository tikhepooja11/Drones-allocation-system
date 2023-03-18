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
exports.UserRepository = void 0;
const logging_1 = __importDefault(require("../library/logging"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
//Dealing with data base operations
class UserRepository {
    constructor() {
        this.register = (registerObj) => __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info("inside reposiroty");
            const { name, email, password } = registerObj;
            console.log(name);
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = new user_1.default({
                name,
                email,
                password: encryptedPassword,
            });
            // Create Token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, config_1.config.token.TOKEN_KEY, {
                expiresIn: "3h",
            });
            user.token = token;
            const savedUser = yield user.save();
            console.log("inside repository", savedUser);
            return savedUser;
        });
        //  fixme
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.findOne({ email: user.email });
            return result;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.findById(id).where("deletedAt").equals(null);
            return result;
        });
        this.listAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.find();
            return result;
        });
        this.findUser = (filterInput) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside findUser repository", filterInput);
            const result = yield user_1.default.findOne(filterInput);
            return result;
        });
        this.updateUserDetails = (userId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const result = (yield user_1.default.findByIdAndUpdate(userId, updateInput));
            return result;
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = (yield user_1.default.findByIdAndDelete(userId));
            return result;
        });
    }
}
exports.UserRepository = UserRepository;
