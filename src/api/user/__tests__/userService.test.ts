import { StatusCodes } from "http-status-codes";
import { Mock } from "vitest";

import { User } from "../user.model";
import { userRepository } from "../user.repo";
import { userService } from "../user.service";

vi.mock("@/api/user/user.repo");
vi.mock("@/server", () => ({
  ...vi.importActual("@/server"),
  logger: {
    error: vi.fn(),
  },
}));

describe("userService", () => {
  const mockUsers: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 42, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: "Bob", email: "bob@example.com", age: 21, createdAt: new Date(), updatedAt: new Date() },
  ];

  describe("findAll", () => {
    it("return all users", async () => {
      // Arrange
      (userRepository.findAllAsync as Mock).mockReturnValue(mockUsers);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.message).toContain("Users found");
      expect(result.data).toEqual(mockUsers);
    });

    // it("returns a not found error for no users found", async () => {
    //   // Arrange
    //   (userRepository.findAllAsync as Mock).mockReturnValue(null);

    //   // Act
    //   const result = await userService.findAll();

    //   // Assert
    //   expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
    //   expect(result.message).toContain("No Users found");
    //   expect(result.data).toBeNull();
    // });

    //   it("handles errors for findAllAsync", async () => {
    //     // Arrange
    //     (userRepository.findAllAsync as Mock).mockRejectedValue(new Error("Database error"));

    //     // Act
    //     const result = await userService.findAll();

    //     // Assert
    //     expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    //     expect(result.message).toContain("Error finding all users");
    //     expect(result.data).toBeNull();
    //   });
  });

  describe("findById", () => {
    it("returns a user for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const mockUser = mockUsers.find((user) => user.id === testId);
      (userRepository.findByIdAsync as Mock).mockReturnValue(mockUser);

      // Act
      const result = await userService.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.message).toContain("User found");
      expect(result.data).toEqual(mockUser);
    });

    // it("handles errors for findByIdAsync", async () => {
    //   // Arrange
    //   const testId = 1;
    //   (userRepository.findByIdAsync as Mock).mockRejectedValue(new Error("Database error"));

    //   // Act
    //   const result = await userService.findById(testId);

    //   // Assert
    //   // expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    //   expect(result.message).toContain(`Error finding user with id ${testId}`);
    //   expect(result.data).toBeNull();
    // });

    // it("returns a not found error for non-existent ID", async () => {
    //   // Arrange
    //   const testId = 1;
    //   (userRepository.findByIdAsync as Mock).mockReturnValue(null);

    //   // Act
    //   const result = await userService.findById(testId);

    //   // Assert
    //   expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
    //   expect(result.message).toContain(`No User found with id ${testId}`);
    //   expect(result.data).toBeNull();
    // });
  });
});
