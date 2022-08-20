"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostgresDataSource = void 0;

var _typeorm = require("typeorm");

var _User = require("@modules/accounts/infra/typeorm/entities/User");

var _UsersTokens = require("@modules/accounts/infra/typeorm/entities/UsersTokens");

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

var _CarImage = require("@modules/cars/infra/typeorm/entities/CarImage");

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

const PostgresDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "172.22.0.1",
  port: 5431,
  username: "databasePG",
  password: "testdatabase",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres",
  entities: [_Specification.Specification, _Category.Category, _User.User, _Car.Car, _CarImage.CarImage, _Rental.Rental, _UsersTokens.UsersTokens],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"]
});
exports.PostgresDataSource = PostgresDataSource;
PostgresDataSource.initialize().then(() => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Data Source has been initialized!");
  }
}).catch(error => {
  console.error("Error during Data Source initialization", error);
});