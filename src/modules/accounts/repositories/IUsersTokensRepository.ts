import { ICreateUserToken } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserToken): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
