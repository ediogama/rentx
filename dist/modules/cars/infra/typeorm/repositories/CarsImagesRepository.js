"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesRepository = void 0;

var _dataSource = require("@shared/infra/typeorm/data-source");

var _CarImage = require("../entities/CarImage");

class CarsImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.PostgresDataSource.getRepository(_CarImage.CarImage);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }

}

exports.CarsImagesRepository = CarsImagesRepository;