"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let carsRepositoryInMemory;
let createCarSpecificationUseCase;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(specificationsRepositoryInMemory, carsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a not exist car", async () => {
    const car_id = "1234";
    const specifications_id = ["12345"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists!"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification test",
      description: "Specification description"
    });
    const specifications_id = [specification.id];
    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });
});