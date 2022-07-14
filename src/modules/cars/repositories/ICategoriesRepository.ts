import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  list(): Category[];
  findByName(categoryName: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
