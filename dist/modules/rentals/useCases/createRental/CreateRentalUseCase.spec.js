"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayJsDateProvider;
const dayAdd24hrs = (0, _dayjs.default)().add(1, "day").toDate();
describe("Create a Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayJsDateProvider = new _DayJsDateProvider.DayJsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(dayJsDateProvider, rentalsRepositoryInMemory, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hrs
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test2",
      expected_return_date: dayAdd24hrs,
      user_id: "321"
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "121223",
      expected_return_date: dayAdd24hrs
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24hrs,
      user_id: "312"
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "test",
      expected_return_date: dayAdd24hrs
    })).rejects.toEqual(new _AppError.AppError("Car is Unavailable!"));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "test",
      car_id: "121223",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return time!"));
  });
});