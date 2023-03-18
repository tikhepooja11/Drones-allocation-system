import { ICategory } from "../models/category";
import { Category, ICategoryUpdate } from "../libs/service-types/category";
import { CategoryRepository } from "../repository/category-repository";

// Business Logic
export class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }

  createCategory = async (category: Category): Promise<ICategory> => {
    console.log("inside createCategory() method", category);
    const result = await this.repository.createCategory(category);
    console.log("inside repo result", result);
    return result;
  };

  getCategoryById = async (id: string): Promise<ICategory | null> => {
    console.log("categoryId", id);
    const category = await this.repository.findById(id);
    console.log("inside category repo", category);
    return category;
  };

  listAllCategories = async (): Promise<ICategory[]> => {
    const categories = await this.repository.listAllCategories();
    return categories;
  };

  updateCategoryDetails = async (
    categoryId: string,
    updateInput: ICategoryUpdate
  ): Promise<ICategory | null> => {
    const categoryDetails = await this.repository.updateCategoryDetails(
      categoryId,
      updateInput
    );
    console.log("inside repo ", categoryDetails);
    return categoryDetails;
  };

  deleteCategory = async (categoryId: string): Promise<ICategory | null> => {
    const category = await this.repository.deleteCategory(categoryId);
    return category;
  };
}
