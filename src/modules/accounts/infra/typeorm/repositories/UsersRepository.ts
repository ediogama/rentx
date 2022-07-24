import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PostgresDataSource } from "@shared/infra/typeorm/data-source";

import { User } from "../entities/User";

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
