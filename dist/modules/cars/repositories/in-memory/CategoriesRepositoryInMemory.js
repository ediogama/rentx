"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("../../infra/typeorm/entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
  }

  async list() {
    const {
      categories
    } = this;
    return categories;
  }

  async findByName(categoryName) {
    const category = this.categories.find(category => category.name === categoryName);
    return category;
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;