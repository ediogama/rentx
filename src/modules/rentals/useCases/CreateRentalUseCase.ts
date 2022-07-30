import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is Unavailable!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
