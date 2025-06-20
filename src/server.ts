import cors from "cors";
import express from "express";
import helmet from "helmet";

import errorHandler from "@/middlewares/errorHandler";
import rateLimiter from "@/middlewares/rateLimiter";
import requestLogger from "@/middlewares/requestLogger";
import { env } from "@/utils/envConfig";
import { docsRouter } from "@/api-docs/docs-router";
import { userRouter } from "@/api/user/user.router";

const app = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/users", userRouter);

// Swagger UI
app.use(docsRouter);

// Error Handling
app.use(errorHandler());

export { app };
