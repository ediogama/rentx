import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoeriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoeriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
