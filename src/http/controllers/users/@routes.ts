import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { refreshController } from "./refresh";
import { profileController } from "./profile";
import { registerController } from "./register";
import { authenticateController } from "./authenticate";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch("/token/refresh", refreshController);

  app.get("/me", { onRequest: [verifyJWT] }, profileController);
}
