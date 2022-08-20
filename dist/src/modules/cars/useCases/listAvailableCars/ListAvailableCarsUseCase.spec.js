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
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
let carsRepositoryInMemory;
let listAvailableCarsUseCase;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all avaiable cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: "Car brand",
            category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
            daily_rate: 150,
            description: "Cars description",
            fine_amount: 10,
            license_plate: "FQN-6157",
            name: "Car test",
        });
        const cars = yield listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all avaiable cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: "Car brand",
            category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
            daily_rate: 150,
            description: "Cars description",
            fine_amount: 10,
            license_plate: "FQN-6157",
            name: "Car test",
        });
        const cars = yield listAvailableCarsUseCase.execute({ name: "Car test" });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all avaiable cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: "Car brand",
            category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
            daily_rate: 150,
            description: "Cars description",
            fine_amount: 10,
            license_plate: "FQN-6157",
            name: "Car test",
        });
        const cars = yield listAvailableCarsUseCase.execute({ brand: "Car brand" });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all avaiable cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            brand: "Car brand",
            category_id: "12345",
            daily_rate: 150,
            description: "Cars description",
            fine_amount: 10,
            license_plate: "FQN-6157",
            name: "Car test",
        });
        const cars = yield listAvailableCarsUseCase.execute({ category_id: "12345" });
        expect(cars).toEqual([car]);
    }));
});
