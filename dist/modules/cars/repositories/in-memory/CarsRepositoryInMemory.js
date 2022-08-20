"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
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
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

  async findAllAvailable(name, brand, category_id) {
    const cars = this.cars.filter(car => {
      if (car.available === true || name && car.name === name || brand && car.brand === brand || category_id && car.category_id === category_id) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;