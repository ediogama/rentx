import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void {
    throw new Error("Method not implemented.");
  }
  list(): Category[] {
    throw new Error("Method not implemented.");
  }
  findByName(categoryName: string): Category {
    throw new Error("Method not implemented.");
  }
}

export { PostgresCategoriesRepository };
