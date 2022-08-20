"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "324565",
      email: "test@email.com",
      name: "Richard Garry",
      password: "12345678"
    });
    await sendForgotPasswordMailUseCase.execute("test@email.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a forgot password email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("test@test.com")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "324565",
      email: "test@email.com",
      name: "Richard Garry",
      password: "12345678"
    });
    await sendForgotPasswordMailUseCase.execute("test@email.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});