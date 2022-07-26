import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  });

  it("should not be able to add a new specification to a not exist car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12345"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test",
    });

    const specifications_id = ["12345"];

    await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
  });
});
