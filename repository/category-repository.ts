import CategoryModel, { ICategory } from "../models/category";
import { Category, ICategoryUpdate } from "../libs/service-types/category";

export class CategoryRepository {
  createCategory = async (category: Category): Promise<ICategory> => {
    console.log("inside createCategory reposiroty", category);
    const categoryModel = new CategoryModel(category);
    const result = await categoryModel.save();
    console.log("inside category repository", result);
    return result;
  };

  findById = async (id: string): Promise<ICategory | null> => {
    const result = await CategoryModel.findById(id)
      .where("deletedAt")
      .equals(null);
    return result;
  };

  listAllCategories = async (): Promise<ICategory[]> => {
    const result = await CategoryModel.find();
    return result;
  };

  updateCategoryDetails = async (
    categoryId: string,
    updateInput: ICategoryUpdate
  ): Promise<ICategory | null> => {
    console.log("siteId", categoryId);
    console.log("siteUpdate", updateInput);
    const options = { new: true };
    const result = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateInput,
      options
    );
    return result;
  };

  deleteCategory = async (categoryId: string): Promise<ICategory | null> => {
    console.log("inside site repository", categoryId);
    const result = await CategoryModel.findByIdAndDelete(categoryId);
    console.log("result", result);
    return result;
  };
}
