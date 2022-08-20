"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _dataSource = require("@shared/infra/typeorm/data-source");

var _UsersTokens = require("../entities/UsersTokens");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.PostgresDataSource.getRepository(_UsersTokens.UsersTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userTokens);
    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.repository.findOneBy({
      user_id,
      refresh_token
    });
  }

  async findByRefreshToken(refresh_token) {
    return this.repository.findOneBy({
      refresh_token
    });
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

}

exports.UsersTokensRepository = UsersTokensRepository;