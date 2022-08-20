"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(specificationName) {
    return this.specifications.find(specification => specification.name === specificationName);
  }

  async findByIds(ids) {
    const specifications = this.specifications.filter(specification => ids.includes(specification.id));
    return specifications;
  }

  async list() {
    return this.specifications;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;