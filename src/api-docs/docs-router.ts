import express, { type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/generator";

export const docsRouter = express.Router();
const openAPIDocument = generateOpenAPIDocument();

docsRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

docsRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
