import { DataSource } from "typeorm";

import { Category } from "../modules/cars/model/Category";
import { Specification } from "../modules/cars/model/Specification";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "databasePG",
  password: "testdatabase",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Specification, Category],
  subscribers: [],
  migrations: [],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
