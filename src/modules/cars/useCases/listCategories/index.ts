import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoeriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = null;

const listCategoriesUseCase = new ListCategoeriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
