import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { historyController } from "./history";
import { metricsController } from "./metrics";

import { createController } from "./create";
import { validateController } from "./validate";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", historyController);
  app.get("/check-ins/metrics", metricsController);

  app.post("/gyms/:gymId/check-ins", createController);
  app.patch("/check-ins/:checkInId/validate", validateController);
}
