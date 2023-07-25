import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";

import { makeResgisterService } from "@/services/factories/make-register-service";

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerService = makeResgisterService();

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send(err.message);
    }

    throw err;
  }

  return res.status(201).send();
}
