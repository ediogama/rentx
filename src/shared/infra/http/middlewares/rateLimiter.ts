import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = createClient({
  socket: { port: Number(process.env.REDIS_PORT), host: process.env.REDIS_HOST },
  disableOfflineQueue: true,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 5,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await redisClient.connect();
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError(`Too many requests ---> ${err}`, 429);
  }
}
