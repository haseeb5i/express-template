import { StatusCodes } from "http-status-codes";

// import { AppError } from "@/common/utils/appError";

import { userRepository } from "./user.repo";
import { formatResponse } from "@/common/utils/httpHandlers";

export const userService = {
  // Retrieves all users from the database
  findAll: async () => {
    const users = await userRepository.findAllAsync();
    if (!users) {
      // throw new AppError(StatusCodes.NOT_FOUND, "No Users found");
      return formatResponse(StatusCodes.NOT_FOUND, "No Users found", null);
    }
    return formatResponse(StatusCodes.OK, "Users Found", users);
  },

  // Retrieves a single user by their ID
  findById: async (id: number) => {
    const user = await userRepository.findByIdAsync(id);
    if (!user) {
      // throw new AppError(StatusCodes.NOT_FOUND, `No User found with id ${id}`);
      return formatResponse(StatusCodes.NOT_FOUND, `No User found with id ${id}`, null);
    }
    return formatResponse(StatusCodes.OK, "User Found", user);
  },
};
