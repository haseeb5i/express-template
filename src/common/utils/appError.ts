import { ReasonPhrases } from "http-status-codes";

export class AppError extends Error {
  // public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(httpCode: number, description: string, isOperational: boolean = true) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.httpCode = httpCode;
    this.isOperational = isOperational;

    // Error.captureStackTrace(this);
  }
}

export class BadRequestException extends AppError {
  constructor(message?: string) {
    super(400, message ?? ReasonPhrases.BAD_REQUEST);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message?: string) {
    super(401, message ?? ReasonPhrases.UNAUTHORIZED);
  }
}

export class ForbiddenException extends AppError {
  constructor(message?: string) {
    super(403, message ?? ReasonPhrases.FORBIDDEN);
  }
}

export class NotFoundException extends AppError {
  constructor(message?: string) {
    super(404, message ?? ReasonPhrases.NOT_FOUND);
  }
}

export class UnprocessableEntityException extends AppError {
  constructor(message?: string) {
    super(422, message ?? ReasonPhrases.UNPROCESSABLE_ENTITY);
  }
}

export class InternalServerException extends AppError {
  constructor(message?: string) {
    super(500, message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

// NotImplementedException
// ImATeapotException
// MethodNotAllowedException
