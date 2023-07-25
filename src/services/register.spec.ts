import { expect, describe, it, beforeEach } from "vitest";

import { RegisterService } from "./register";

import { compare } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123321",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123321",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same e-mail twice", async () => {
    await sut.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123321",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123321",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
