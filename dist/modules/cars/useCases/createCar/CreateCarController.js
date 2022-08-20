"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  async handle(request, response) {
    const {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate
    });
    return response.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;