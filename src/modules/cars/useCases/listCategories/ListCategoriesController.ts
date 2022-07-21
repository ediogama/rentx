import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoeriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  handle(request: Request, response: Response): Response {
    const listCategoriesUseCase = container.resolve(ListCategoeriesUseCase);

    const categories = listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
