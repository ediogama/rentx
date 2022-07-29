import { Repository } from "typeorm";

import { PostgresDataSource } from "@shared/infra/typeorm/data-source";

import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "./IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Rental);
  }

  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOneBy({ user_id });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOneBy({ car_id });
  }
}

export { RentalsRepository };
