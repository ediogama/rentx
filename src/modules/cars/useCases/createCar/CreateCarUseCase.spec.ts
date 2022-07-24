import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        brand: "Brand test",
        category_id: "category",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-5676",
      });

      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        brand: "Brand test",
        category_id: "category",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-5676",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description Car",
      brand: "Brand test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-5676",
    });

    expect(car.available).toBe(true);
  });
});
