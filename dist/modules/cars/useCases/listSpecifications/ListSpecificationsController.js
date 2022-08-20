"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationsController = void 0;

var _tsyringe = require("tsyringe");

var _LIstSpecificationsUseCase = require("./LIstSpecificationsUseCase");

class ListSpecificationsController {
  async handle(request, response) {
    const listSpecificationsUseCase = _tsyringe.container.resolve(_LIstSpecificationsUseCase.ListSpecificationsUseCase);

    const specifications = await listSpecificationsUseCase.execute();
    return response.json(specifications);
  }

}

exports.ListSpecificationsController = ListSpecificationsController;