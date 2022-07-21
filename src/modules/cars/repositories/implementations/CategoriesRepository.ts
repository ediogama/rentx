import { Repository } from "typeorm";

import { PostgresDataSource } from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const listCategories = await this.repository.find();
    return listCategories;
  }

  async findByName(categoryName: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name: categoryName });

    return category;
  }
}

export { CategoriesRepository };
