import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/response-builder";
import { validateRequest } from "@/utils/httpHandlers";

import { userService } from "./user.service";
import { GetUserSchema, UserSchema } from "./user.model";

export const userRegistry = new OpenAPIRegistry();
userRegistry.register("User", UserSchema);

const router = express.Router();
export const userRouter = router;

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

router.get("/", async (_req, res) => {
  const serviceResponse = await userService.findAll();
  res.status(serviceResponse.statusCode).send(serviceResponse);
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
  const serviceResponse = await userService.findById(id);
  res.status(serviceResponse.statusCode).send(serviceResponse);
});
