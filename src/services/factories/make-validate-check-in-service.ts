import { ValidateCheckInService } from "../validate-check-in";

import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckInService = new ValidateCheckInService(checkInsRepository);

  return validateCheckInService;
}
