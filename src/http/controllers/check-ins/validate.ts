import { z } from "zod";

import { FastifyRequest, FastifyReply } from "fastify";

import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validateController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId,
  });

  return res.status(204).send();
}