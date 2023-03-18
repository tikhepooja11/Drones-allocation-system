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
const auth_1 = require("../middlewares/auth");
const category_1 = require("../services/category");
const router = express_1.default.Router();
router.post("/create", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside category route");
    const categoryService = new category_1.CategoryService();
    try {
        const { name, color, tagName } = req.body;
        const category = yield categoryService.createCategory({
            name,
            color,
            tagName,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return res.status(200).json(category);
    }
    catch (error) {
        logging_1.default.error(`Error in creating a new category`);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/getAll", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Listing all sites");
    const categoryService = new category_1.CategoryService();
    try {
        const categories = yield categoryService.listAllCategories();
        if ((categories === null || categories === void 0 ? void 0 : categories.length) > 0) {
            return response.status(200).send(categories);
        }
        else {
            logging_1.default.error(`categories are not found`);
            return response.status(404).json({ message: "categories are not found" });
        }
    }
    catch (error) {
        response.status(500).send(error).json({ message: "Internal server error" });
    }
}));
router.get("/getCategoryById/:id", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Fetching category with id");
    const categoryService = new category_1.CategoryService();
    const categoryId = request.params.id;
    try {
        const category = yield categoryService.getCategoryById(categoryId);
        console.log("inside category route", category);
        if (category) {
            return response.status(200).send(category);
        }
        else {
            return response
                .status(404)
                .json({ message: "Category with id not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Internal Server error`);
        return response.status(500).json({ message: "Internal Server error" });
    }
}));
router.delete("/delete/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Deleting category");
    const categoryId = req.params.id;
    const categoryService = new category_1.CategoryService();
    try {
        const deletedCategory = yield categoryService.deleteCategory(categoryId);
        if (deletedCategory) {
            return res.status(200).send(deletedCategory);
        }
        else {
            return res.status(404).json({ message: "category with id not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Error in deleting Category`);
        return res.status(500).json({ message: "Internal server erro" });
    }
}));
router.patch("/update/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Updating category details");
    const categoryId = req.params.id;
    console.log(req.body);
    const updateInput = req.body;
    const categoryService = new category_1.CategoryService();
    console.log("updateInput", updateInput);
    try {
        const updatedCategory = yield categoryService.updateCategoryDetails(categoryId, updateInput);
        if (updatedCategory) {
            return res.status(200).send(updatedCategory);
        }
        else {
            return res.status(404).json({ message: "category with id not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Internal Server error`);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
