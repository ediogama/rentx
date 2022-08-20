"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a new car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676"
    });
    await expect(createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676"
    })).rejects.toEqual(new _AppError.AppError("Car already exists!"));
  });
  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676"
    });
    expect(car.available).toBe(true);
  });
});