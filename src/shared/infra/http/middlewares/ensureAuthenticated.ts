import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "dad11cfef8f1f8c78bb23962643aa0e865f60dc5");

    const userRepositorty = container.resolve(UsersRepository);

    const user = await userRepositorty.findById(user_id as string);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = {
      id: user_id as string,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
