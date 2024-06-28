import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "../utils/appError";

export type ServiceResponse<T = null> = {
  message: string;
  statusCode: number;
  data: T;
};

export const formatResponse = <T = null>(httpCode: number, message: string, respObject: T): ServiceResponse<T> => {
  return {
    message,
    statusCode: httpCode,
    data: respObject,
  };
};

export const handleResponse = (response: Response, serviceResponse: ServiceResponse<any>) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    next(new AppError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));
  }
};
