import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { PostgresDataSource } from "../data-source";

async function createUserAdmin() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  await PostgresDataSource.driver.connect();

  const queryRunner = PostgresDataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`
  );

  await PostgresDataSource.destroy();
}

createUserAdmin()
  .then(() => console.log("User Admin Created!"))
  .catch((error) => console.log(error));

export { createUserAdmin };
