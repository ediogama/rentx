import { Repository } from "typeorm";

import { PostgresDataSource } from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = PostgresDataSource.getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    await this.usersRepository.save(user);
  }
}

export { UsersRepository };
