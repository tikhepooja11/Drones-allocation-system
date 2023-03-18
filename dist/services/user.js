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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repository/user-repository");
// All Business logic will be here
class UserService {
    constructor() {
        this.register = (registerObj) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside registerUser() method");
            const user = yield this.repository.register(registerObj);
            return user;
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findById(id);
            return user;
        });
        this.listAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.repository.listAllUsers();
            return userList;
        });
        this.findUser = (filterInput) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside findUser service", filterInput);
            const userList = yield this.repository.findUser(filterInput);
            return userList;
        });
        this.updateUserDetails = (userId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.repository.updateUserDetails(userId, updateInput);
            return userList;
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.repository.deleteUser(userId);
            return userList;
        });
        this.repository = new user_repository_1.UserRepository();
    }
}
exports.UserService = UserService;
