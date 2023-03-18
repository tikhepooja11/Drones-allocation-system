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
exports.CategoryRepository = void 0;
const category_1 = __importDefault(require("../models/category"));
//Dealing with data base operations
class CategoryRepository {
    constructor() {
        this.createCategory = (category) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside createCategory reposiroty", category);
            const categoryModel = new category_1.default(category);
            const result = yield categoryModel.save();
            console.log("inside category repository", result);
            return result;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_1.default.findById(id)
                .where("deletedAt")
                .equals(null);
            return result;
        });
        this.listAllCategories = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_1.default.find();
            return result;
        });
        this.updateCategoryDetails = (categoryId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            console.log("siteId", categoryId);
            console.log("siteUpdate", updateInput);
            const options = { new: true };
            const result = yield category_1.default.findByIdAndUpdate(categoryId, updateInput, options);
            return result;
        });
        this.deleteCategory = (categoryId) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside site repository", categoryId);
            const result = yield category_1.default.findByIdAndDelete(categoryId);
            console.log("result", result);
            return result;
        });
    }
}
exports.CategoryRepository = CategoryRepository;
