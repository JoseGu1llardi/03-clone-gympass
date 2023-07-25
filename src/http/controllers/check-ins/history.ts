import { z } from "zod";

import { FastifyRequest, FastifyReply } from "fastify";

import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";

export async function historyController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    userId: req.user.sub,
    page,
  });

  return res.status(200).send({
    checkIns,
  });
}
