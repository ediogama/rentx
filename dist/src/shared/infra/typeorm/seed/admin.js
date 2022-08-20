"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAdmin = void 0;
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
function createUserAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcrypt_1.hash)("admin", 8);
        yield data_source_1.PostgresDataSource.driver.connect();
        const queryRunner = data_source_1.PostgresDataSource.createQueryRunner();
        yield queryRunner.connect();
        yield queryRunner.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`);
        yield data_source_1.PostgresDataSource.destroy();
    });
}
exports.createUserAdmin = createUserAdmin;
createUserAdmin()
    .then(() => console.log("User Admin Created!"))
    .catch((error) => console.log(error));
