"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

var _dataSource = require("@shared/infra/typeorm/data-source");

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.PostgresDataSource.getRepository(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }

  async list() {
    const listCategories = await this.repository.find();
    return listCategories;
  }

  async findByName(categoryName) {
    const category = await this.repository.findOneBy({
      name: categoryName
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;