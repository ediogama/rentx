import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
// eslint-disable-next-line import-helpers/order-imports
import * as Tracing from "@sentry/tracing";

import "reflect-metadata";
import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: "https://7c93d0bfc7434054aa69a0ad2ff6e478@o1388267.ingest.sentry.io/6710556",
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
