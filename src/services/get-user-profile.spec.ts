import { hash } from "bcryptjs";

import { expect, describe, it, beforeEach } from "vitest";

import { GetUserProfileteService } from "./get-user-profile";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

// sut means 'system under testing';
let sut: GetUserProfileteService;
let usersRepository: InMemoryUsersRepository;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileteService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Smith",
      email: "johndoe@gmail.com",
      password_hash: await hash("123321", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Smith");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
