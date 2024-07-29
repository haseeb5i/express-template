import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { commonValidations } from "@/common/utils/validations";

extendZodWithOpenApi(z);

export const UserSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    age: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi("User");
export type User = z.infer<typeof UserSchema>;

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
