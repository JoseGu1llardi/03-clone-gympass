import { expect, describe, it, beforeEach } from "vitest";

import { AuthenticateService } from "./authenticate";

import { hash } from "bcryptjs";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

// sut means 'system under testing';
let sut: AuthenticateService;
let usersRepository: InMemoryUsersRepository;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Smith",
      email: "johndoe@gmail.com",
      password_hash: await hash("123321", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "123321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Smith",
      email: "johndoe@gmail.com",
      password_hash: await hash("123321", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "123320",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
