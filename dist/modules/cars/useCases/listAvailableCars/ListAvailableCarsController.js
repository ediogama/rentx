"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      name,
      brand,
      category_id
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      name: name,
      brand: brand,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;