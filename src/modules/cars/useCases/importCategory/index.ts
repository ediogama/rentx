import { ImportCategoryController } from "./ImportCategoryController";
import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = null;

const importCategoryUseCase = new ImporteCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
