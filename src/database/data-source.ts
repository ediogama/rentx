import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "172.22.0.1",
  port: 5431,
  username: "databasePG",
  password: "testdatabase",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Specification, Category],
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
