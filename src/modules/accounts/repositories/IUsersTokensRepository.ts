import { ICreateUserToken } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserToken): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
