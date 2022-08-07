import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "324565",
      email: "test@email.com",
      name: "Richard Garry",
      password: "12345678",
    });

    await sendForgotPasswordMailUseCase.execute("test@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("test@test.com")).rejects.toEqual(
      new AppError("User does not exists!")
    );
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "324565",
      email: "test@email.com",
      name: "Richard Garry",
      password: "12345678",
    });

    await sendForgotPasswordMailUseCase.execute("test@email.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
