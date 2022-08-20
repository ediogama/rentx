"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _dataSource = require("@shared/infra/typeorm/data-source");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.PostgresDataSource.getRepository(_Rental.Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  findById(id) {
    return this.repository.findOneBy({
      id
    });
  }

  findByUserId(user_id) {
    return this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
  }

  findOpenRentalByUser(user_id) {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
  }

  findOpenRentalByCar(car_id) {
    return this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
  }

}

exports.RentalsRepository = RentalsRepository;