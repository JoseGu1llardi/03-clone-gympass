import { RegisterService } from "../register";

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeResgisterService() {
  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
