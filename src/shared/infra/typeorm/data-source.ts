import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST_ENV === "dev" ? "172.20.0.1" : "172.25.0.1",
  port: 5431,
  username: "databasePG",
  password: "testdatabase",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres",
  entities: [Specification, Category, User, Car, CarImage, Rental, UsersTokens],
  migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
});

PostgresDataSource.initialize()
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Data Source has been initialized!");
    }
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
