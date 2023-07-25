import { expect, describe, it, beforeEach } from "vitest";

import { CreateGym } from "./create-gym";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGym;

describe("Register Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGym(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "I9",
      description: "The body reaches what the minds believes!",
      phone: "(11) 996324674",
      latitude: 53.3856256,
      longitude: -6.2291968,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
