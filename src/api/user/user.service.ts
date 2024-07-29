import { NotFoundException } from "@/common/utils/appError";

import { userRepository } from "./user.repo";
import { formatResponse } from "@/common/utils/httpHandlers";

export const userService = {
  // Retrieves all users from the database
  findAll: async () => {
    const users = await userRepository.findAllAsync();
    if (!users) {
      throw new NotFoundException("No Users found");
    }
    return formatResponse("Users found", users);
  },

  // Retrieves a single user by their ID
  findById: async (id: number) => {
    const user = await userRepository.findByIdAsync(id);
    if (!user) {
      throw new NotFoundException(`No User found with id ${id}`);
    }
    return formatResponse("User found", user);
  },
};
