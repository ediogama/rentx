"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("@modules/accounts/infra/typeorm/entities/User");
const UsersTokens_1 = require("@modules/accounts/infra/typeorm/entities/UsersTokens");
const Car_1 = require("@modules/cars/infra/typeorm/entities/Car");
const CarImage_1 = require("@modules/cars/infra/typeorm/entities/CarImage");
const Category_1 = require("@modules/cars/infra/typeorm/entities/Category");
const Specification_1 = require("@modules/cars/infra/typeorm/entities/Specification");
const Rental_1 = require("@modules/rentals/infra/typeorm/entities/Rental");
exports.PostgresDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "172.22.0.1",
    port: 5431,
    username: "databasePG",
    password: "testdatabase",
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres",
    entities: [Specification_1.Specification, Category_1.Category, User_1.User, Car_1.Car, CarImage_1.CarImage, Rental_1.Rental, UsersTokens_1.UsersTokens],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});
exports.PostgresDataSource.initialize()
    .then(() => {
    if (process.env.NODE_ENV !== "test") {
        console.log("Data Source has been initialized!");
    }
})
    .catch((error) => {
    console.error("Error during Data Source initialization", error);
});
