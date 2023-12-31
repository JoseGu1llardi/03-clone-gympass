import { CheckInService } from "../check-in";

import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInService() {
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrismaCheckInsRepository();

  const checkInService = new CheckInService(checkInsRepository, gymsRepository);

  return checkInService;
}
