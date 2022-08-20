"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let carsRepositoryInMemory;
let createCarSpecificationUseCase;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(specificationsRepositoryInMemory, carsRepositoryInMemory);
    });
    it("should not be able to add a new specification to a not exist car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = "1234";
        const specifications_id = ["12345"];
        yield expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })).rejects.toEqual(new AppError_1.AppError("Car does not exists!"));
    }));
    it("should be able to add a new specification to the car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: "Car brand",
            category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
            daily_rate: 150,
            description: "Cars description",
            fine_amount: 10,
            license_plate: "FQN-6157",
            name: "Car test",
        });
        const specification = yield specificationsRepositoryInMemory.create({
            name: "Specification test",
            description: "Specification description",
        });
        const specifications_id = [specification.id];
        const specificationsCar = yield createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    }));
});
