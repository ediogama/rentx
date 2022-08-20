"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _dataSource = require("@shared/infra/typeorm/data-source");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await _dataSource.PostgresDataSource.driver.connect();
    await _dataSource.PostgresDataSource.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);

    const queryRunner = _dataSource.PostgresDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`);
  });
  afterAll(async () => {
    await _dataSource.PostgresDataSource.dropDatabase();
    await _dataSource.PostgresDataSource.destroy();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/session").send({
      email: "admin@rentx.com",
      password: "admin"
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it("should not be able to create a new category with the same name", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/session").send({
      email: "admin@rentx.com",
      password: "admin"
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(400);
  });
});