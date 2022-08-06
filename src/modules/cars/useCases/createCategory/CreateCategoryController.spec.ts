import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { PostgresDataSource } from "@shared/infra/typeorm/data-source";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await PostgresDataSource.driver.connect();
    await PostgresDataSource.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);

    const queryRunner = PostgresDataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`
    );
  });

  afterAll(async () => {
    await PostgresDataSource.dropDatabase();
    await PostgresDataSource.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with the same name", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
