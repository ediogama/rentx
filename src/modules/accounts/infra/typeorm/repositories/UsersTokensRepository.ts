import { Repository } from "typeorm";

import { ICreateUserToken } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PostgresDataSource } from "@shared/infra/typeorm/data-source";

import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(UsersTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserToken): Promise<UsersTokens> {
    const userTokens = this.repository.create({ expires_date, refresh_token, user_id });

    await this.repository.save(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    return this.repository.findOneBy({ user_id, refresh_token });
  }
}

export { UsersTokensRepository };
