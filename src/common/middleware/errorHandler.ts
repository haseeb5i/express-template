import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ErrorRequestHandler, RequestHandler } from "express";

import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";

const notFoundHandler: RequestHandler = () => {
  throw new AppError(404, "Not Found");
};

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error(error);

  let isTrusted = false;
  if (error instanceof AppError) {
    isTrusted = error.isOperational;
  }

  const httpStatusCode = isTrusted ? (error as AppError).httpCode : StatusCodes.INTERNAL_SERVER_ERROR;
  const responseError = isTrusted ? error.message : ReasonPhrases.INTERNAL_SERVER_ERROR;
  res.status(httpStatusCode).send({ statusCode: httpStatusCode, message: responseError, data: null });
};

export default () => [notFoundHandler, errorHandler];
