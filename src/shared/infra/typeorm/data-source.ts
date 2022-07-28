import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "172.22.0.1",
  port: 5431,
  username: "databasePG",
  password: "testdatabase",
  database: "postgres",
  entities: [Specification, Category, User, Car, CarImage],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
