import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply
) {
  await req.jwtVerify();

  const getUser = makeGetUserProfileService();

  const { user } = await getUser.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
