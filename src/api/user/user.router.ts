import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { GetUserSchema, UserSchema } from "./user.model";
import { userService } from "./user.service";
import { handleResponse, validateRequest } from "@/common/utils/httpHandlers";

export const userRegistry = new OpenAPIRegistry();
userRegistry.register("User", UserSchema);

const router = express.Router();

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

router.get("/", async (_req, res) => {
  const payload = await userService.findAll();
  handleResponse(res, payload);
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: GetUserSchema.shape,
  responses: createApiResponse(UserSchema, "Success"),
});

router.get("/:id", validateRequest(GetUserSchema), async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  const payload = await userService.findById(id);
  handleResponse(res, payload);
});

export const userRouter = router;
