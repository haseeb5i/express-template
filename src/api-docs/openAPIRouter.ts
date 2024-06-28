import express from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";

const router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

router.get("/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));

export const openAPIRouter = router;
