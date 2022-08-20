"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UsersTokens = require("@modules/accounts/infra/typeorm/entities/UsersTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UsersTokens.UsersTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;