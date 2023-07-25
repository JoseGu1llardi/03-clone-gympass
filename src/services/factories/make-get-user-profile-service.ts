import { GetUserProfileteService } from "../get-user-profile";

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileteService = new GetUserProfileteService(usersRepository);

  return getUserProfileteService;
}
