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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
const app_1 = require("@shared/infra/http/app");
const data_source_1 = require("@shared/infra/typeorm/data-source");
describe("Create Category Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.PostgresDataSource.driver.connect();
        yield data_source_1.PostgresDataSource.runMigrations();
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcrypt_1.hash)("admin", 8);
        const queryRunner = data_source_1.PostgresDataSource.createQueryRunner();
        yield queryRunner.connect();
        yield queryRunner.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.PostgresDataSource.dropDatabase();
        yield data_source_1.PostgresDataSource.destroy();
    }));
    it("should be able to create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app).post("/session").send({
            email: "admin@rentx.com",
            password: "admin",
        });
        const { token } = responseToken.body;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send({
            name: "Category Supertest",
            description: "Category Supertest",
        })
            .set({
            Authorization: `Bearer ${token}`,
        });
        expect(response.status).toBe(201);
    }));
    it("should not be able to create a new category with the same name", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app).post("/session").send({
            email: "admin@rentx.com",
            password: "admin",
        });
        const { token } = responseToken.body;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send({
            name: "Category Supertest",
            description: "Category Supertest",
        })
            .set({
            Authorization: `Bearer ${token}`,
        });
        expect(response.status).toBe(400);
    }));
});
