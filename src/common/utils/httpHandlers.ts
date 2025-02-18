import { NextFunction, Request, Response } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { UnprocessableEntityException } from "../utils/appError";

export type ApiResponse<T = null> = {
  message: string;
  statusCode: number;
  data: T;
};

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number().gte(200),
    message: z.string(),
    data: dataSchema.optional(),
  });

export const formatResponse = <T = null>(message: string, respObject: T, httpCode = 200): ApiResponse<T> => {
  return {
    message,
    statusCode: httpCode,
    data: respObject,
  };
};

export const handleResponse = (response: Response, serviceResponse: ApiResponse<any>) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    next(new UnprocessableEntityException(errorMessage));
  }
};
