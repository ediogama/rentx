"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _dataSource = require("@shared/infra/typeorm/data-source");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.PostgresDataSource.getRepository(_Car.Car);
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOneBy({
      license_plate
    });
    return car;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findById(id) {
    const car = await this.repository.findOneBy({
      id
    });
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

  async findAllAvailable(name, category_id, brand) {
    const carsQuery = this.repository.createQueryBuilder("car").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("car.name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("car.category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

}

exports.CarsRepository = CarsRepository;