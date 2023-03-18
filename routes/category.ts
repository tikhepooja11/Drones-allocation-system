import express from "express";
import Logging from "../loggers/logging";
import { ICategoryUpdate } from "../libs/service-types/category";
import { tokenVerifiy } from "../middlewares/auth";
import { ICategory } from "../models/category";
import { CategoryService } from "../services/category";

const router = express.Router();

router.post("/create", tokenVerifiy, async (req, res) => {
  console.log("inside category route");
  const categoryService = new CategoryService();

  try {
    const { name, color, tagName } = req.body;
    const category: ICategory = await categoryService.createCategory({
      name,
      color,
      tagName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return res.status(200).json(category);
  } catch (error) {
    Logging.error(`Error in creating a new category`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getAll", tokenVerifiy, async (request, response) => {
  Logging.info("Listing all sites");
  const categoryService = new CategoryService();
  try {
    const categories = await categoryService.listAllCategories();
    if (categories?.length > 0) {
      return response.status(200).send(categories);
    } else {
      Logging.error(`categories are not found`);
      return response.status(404).json({ message: "categories are not found" });
    }
  } catch (error) {
    response.status(500).send(error).json({ message: "Internal server error" });
  }
});

router.get("/getCategoryById/:id", tokenVerifiy, async (request, response) => {
  Logging.info("Fetching category with id");
  const categoryService = new CategoryService();
  const categoryId: string = request.params.id;
  try {
    const category = await categoryService.getCategoryById(categoryId);
    console.log("inside category route", category);
    if (category) {
      return response.status(200).send(category);
    } else {
      return response
        .status(404)
        .json({ message: "Category with id not found" });
    }
  } catch (error) {
    Logging.error(`Internal Server error`);
    return response.status(500).json({ message: "Internal Server error" });
  }
});

router.delete("/delete/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Deleting category");
  const categoryId = req.params.id;
  const categoryService = new CategoryService();
  try {
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    if (deletedCategory) {
      return res.status(200).send(deletedCategory);
    } else {
      return res.status(404).json({ message: "category with id not found" });
    }
  } catch (error) {
    Logging.error(`Error in deleting Category`);
    return res.status(500).json({ message: "Internal server erro" });
  }
});

router.patch("/update/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Updating category details");
  const categoryId = req.params.id;
  console.log(req.body);
  const updateInput: ICategoryUpdate = req.body;
  const categoryService = new CategoryService();
  console.log("updateInput", updateInput);
  try {
    const updatedCategory = await categoryService.updateCategoryDetails(
      categoryId,
      updateInput
    );
    if (updatedCategory) {
      return res.status(200).send(updatedCategory);
    } else {
      return res.status(404).json({ message: "category with id not found" });
    }
  } catch (error) {
    Logging.error(`Internal Server error`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export = router;
