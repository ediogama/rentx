"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ListSpecificationsController = require("@modules/cars/useCases/listSpecifications/ListSpecificationsController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationsController = new _ListSpecificationsController.ListSpecificationsController();
specificationsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
specificationsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);