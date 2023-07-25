import { z } from "zod";

import { FastifyRequest, FastifyReply } from "fastify";

import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service";

export async function nearbyController(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query);

  const fetchNearbyGyms = makeFetchNearbyGymsService();

  const { gyms } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(200).send({
    gyms,
  });
}
