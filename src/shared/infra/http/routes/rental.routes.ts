import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

const devolutionRentalController = new DevolutionRentalController();

const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
