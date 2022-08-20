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
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayJsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const sendForgotPasswordMailUseCase_1 = require("./sendForgotPasswordMailUseCase");
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider_1.DayJsDateProvider();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new sendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("should be able to send a forgot password email to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        yield usersRepositoryInMemory.create({
            driver_license: "324565",
            email: "test@email.com",
            name: "Richard Garry",
            password: "12345678",
        });
        yield sendForgotPasswordMailUseCase.execute("test@email.com");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send a forgot password email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("test@test.com")).rejects.toEqual(new AppError_1.AppError("User does not exists!"));
    }));
    it("should be able to create an users token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
        yield usersRepositoryInMemory.create({
            driver_license: "324565",
            email: "test@email.com",
            name: "Richard Garry",
            password: "12345678",
        });
        yield sendForgotPasswordMailUseCase.execute("test@email.com");
        expect(generateTokenMail).toHaveBeenCalled();
    }));
});
