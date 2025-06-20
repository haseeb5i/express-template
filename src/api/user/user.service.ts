import { StatusCodes } from "http-status-codes";

import { logger } from "@/utils/logger";
import { NotFoundException } from "@/utils/appError";
import { ServiceResponse } from "@/utils/httpHandlers";
import { User } from "./user.model";

export const userService = {
  // Retrieves all users from the database
  findAll: async () => {
    const users = await userRepository.findAllAsync();
    if (!users) {
      throw new NotFoundException("No Users found");
    }
    return ServiceResponse.success("Users found", users);
  },

  // Retrieves a single user by their ID
  findById: async (id: number) => {
    try {
      const user = await userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};

export const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "Bob", email: "bob@example.com", age: 21, createdAt: new Date(), updatedAt: new Date() },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return users;
  },

  findByIdAsync: async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },
};
