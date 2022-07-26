import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all avaiable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "a286a03e-e35d-496f-b884-a803ecd377e4",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car brand" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "12345",
      daily_rate: 150,
      description: "Cars description",
      fine_amount: 10,
      license_plate: "FQN-6157",
      name: "Car test",
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "12345" });

    expect(cars).toEqual([car]);
  });
});
