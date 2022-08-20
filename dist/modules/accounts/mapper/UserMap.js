"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    name,
    email,
    id,
    avatar,
    driver_license,
    avatar_url
  }) {
    const user = (0, _classTransformer.instanceToInstance)({
      name,
      email,
      id,
      avatar,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;