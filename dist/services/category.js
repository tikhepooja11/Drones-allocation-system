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
exports.CategoryService = void 0;
const category_repository_1 = require("../repository/category-repository");
// All Business logic will be here
class CategoryService {
    constructor() {
        this.createCategory = (category) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside createCategory() method", category);
            const result = yield this.repository.createCategory(category);
            console.log("inside repo result", result);
            return result;
        });
        this.getCategoryById = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("categoryId", id);
            const category = yield this.repository.findById(id);
            console.log("inside category repo", category);
            return category;
        });
        this.listAllCategories = () => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.repository.listAllCategories();
            return categories;
        });
        this.updateCategoryDetails = (categoryId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const categoryDetails = yield this.repository.updateCategoryDetails(categoryId, updateInput);
            console.log("inside repo ", categoryDetails);
            return categoryDetails;
        });
        this.deleteCategory = (categoryId) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.deleteCategory(categoryId);
            return category;
        });
        this.repository = new category_repository_1.CategoryRepository();
    }
}
exports.CategoryService = CategoryService;
