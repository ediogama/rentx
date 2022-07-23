import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const { categories } = this;

    return categories;
  }
  async findByName(categoryName: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === categoryName);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
