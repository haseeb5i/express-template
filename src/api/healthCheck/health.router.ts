import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { formatResponse, handleResponse } from "@/common/utils/httpHandlers";

export const healthCheckRegistry = new OpenAPIRegistry();

const router = express.Router();

healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

router.get("/", (_req, res) => {
  const payload = formatResponse("Service is healthy", null);
  handleResponse(res, payload);
});

export const healthCheckRouter = router;
