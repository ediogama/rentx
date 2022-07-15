import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImporteCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
