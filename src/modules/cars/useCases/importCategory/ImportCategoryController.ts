import { Request, Response } from "express";

import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImporteCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
