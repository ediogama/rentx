import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoeriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = new CategoriesRepository();

const listCategoriesUseCase = new ListCategoeriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
