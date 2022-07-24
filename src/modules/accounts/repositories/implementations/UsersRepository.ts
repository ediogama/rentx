import { Repository } from "typeorm";

import { PostgresDataSource } from "@database/data-source";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = PostgresDataSource.getRepository(User);
  }

  async create({ name, password, email, driver_license, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.usersRepository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }
}

export { UsersRepository };
