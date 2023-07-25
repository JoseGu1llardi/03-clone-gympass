import { CreateGym } from "../create-gym";

import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const createGym = new CreateGym(gymsRepository);

  return createGym;
}
