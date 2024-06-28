import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { ApiResponseSchema } from "@/common/utils/httpHandlers";

export function createApiResponse(schema: z.ZodTypeAny, description: string, statusCode = StatusCodes.OK) {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema: ApiResponseSchema(schema),
        },
      },
    },
  };
}
