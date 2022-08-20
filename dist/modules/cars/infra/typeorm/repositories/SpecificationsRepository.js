"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

var _dataSource = require("@shared/infra/typeorm/data-source");

class SpecificationsRepository {
  constructor() {
    this.specifications = void 0;
    this.specifications = _dataSource.PostgresDataSource.getRepository(_Specification.Specification);
  }

  async findByIds(ids) {
    const specifications = await this.specifications.findBy({
      id: (0, _typeorm.In)(ids)
    });
    return specifications;
  }

  async findByName(specificationName) {
    const specification = await this.specifications.findOneBy({
      name: specificationName
    });
    return specification;
  }

  async list() {
    const specifications = await this.specifications.find();
    return specifications;
  }

  async create({
    name,
    description
  }) {
    const specification = this.specifications.create({
      name,
      description
    });
    await this.specifications.save(specification);
    return specification;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;