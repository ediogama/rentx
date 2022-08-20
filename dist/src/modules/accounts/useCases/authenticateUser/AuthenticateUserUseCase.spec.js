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
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayJsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
const AppError_1 = require("@shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("../../repositories/in-memory/UsersRepositoryInMemory");
const CreateUserUseCase_1 = require("../createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let usersTokenRepositoryInMemory;
let dayJsDateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider_1.DayJsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dayJsDateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "000123",
            email: "user@test.com",
            password: "12345678",
            name: "User test",
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    }));
    it("should not be able to authenticate an nonexistent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: "user@test.com",
            password: "12345678",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
    it("should not be able to authenticate an user with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "000123",
            email: "user@test.com",
            password: "12345678",
            name: "User test",
        };
        yield createUserUseCase.execute(user);
        yield expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "12678",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
});
