"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserAdmin = createUserAdmin;

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _dataSource = require("../data-source");

async function createUserAdmin() {
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)("admin", 8);
  await _dataSource.PostgresDataSource.driver.connect();

  const queryRunner = _dataSource.PostgresDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`);
  await _dataSource.PostgresDataSource.destroy();
}

createUserAdmin().then(() => console.log("User Admin Created!")).catch(error => console.log(error));