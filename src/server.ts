import cors from "cors";
import express from "express";
import helmet from "helmet";

import { healthCheckRouter } from "@/api/healthCheck/health.router";
import { userRouter } from "@/api/user/user.router";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { env } from "@/common/utils/envConfig";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";

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
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error Handling
app.use(errorHandler());

export { app };
