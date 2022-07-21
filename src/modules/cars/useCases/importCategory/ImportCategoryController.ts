import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImporteCategoryUseCase);

    importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
