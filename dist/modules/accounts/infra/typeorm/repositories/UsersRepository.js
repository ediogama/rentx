"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _dataSource = require("@shared/infra/typeorm/data-source");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.usersRepository = void 0;
    this.usersRepository = _dataSource.PostgresDataSource.getRepository(_User.User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id
  }) {
    const user = this.usersRepository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id
    });
    await this.usersRepository.save(user);
  }

  async findByEmail(email) {
    const user = this.usersRepository.findOneBy({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.usersRepository.findOneBy({
      id
    });
    return user;
  }

}

exports.UsersRepository = UsersRepository;