import { NextFunction, Request, Response } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly result: T;
  readonly statusCode: number;

  private constructor(success: boolean, message: string, responseObject: T, statusCode: number) {
    this.success = success;
    this.message = message;
    this.result = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(message: string, responseObject: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  static failure<T>(message: string, responseObject: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(false, message, responseObject, statusCode);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    result: dataSchema.optional(),
    statusCode: z.number(),
  });

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, StatusCodes.BAD_REQUEST);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  }
};
