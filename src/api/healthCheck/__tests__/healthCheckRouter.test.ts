import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { app } from "@/server";
import { ServiceResponse } from "@/common/utils/httpHandlers";

describe("Health Check API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(app).get("/health-check");
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.data).toBeNull();
    expect(result.message).toEqual("Service is healthy");
  });
});