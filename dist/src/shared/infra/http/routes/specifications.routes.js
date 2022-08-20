"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
const express_1 = require("express");
const CreateSpecificationController_1 = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");
const ListSpecificationsController_1 = require("@modules/cars/useCases/listSpecifications/ListSpecificationsController");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const specificationsRoutes = (0, express_1.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new CreateSpecificationController_1.CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController_1.ListSpecificationsController();
specificationsRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);