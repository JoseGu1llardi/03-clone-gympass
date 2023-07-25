import { expect, describe, it, beforeEach } from "vitest";

import { SearchGymsService } from "./search-gyms";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript GYM",
      description: "The body reaches what the minds believes!",
      phone: "(11) 996324674",
      latitude: 53.3856256,
      longitude: -6.2291968,
    });

    await gymsRepository.create({
      title: "Typescript GYM",
      description: "The body reaches what the minds believes!",
      phone: "(11) 996324674",
      latitude: 53.3856256,
      longitude: -6.2291968,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript GYM" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript GYM ${i}`,
        description: "The body reaches what the minds believes!",
        phone: "(11) 996324674",
        latitude: 53.3856256,
        longitude: -6.2291968,
      });
    }

    const { gyms } = await sut.execute({
      query: "script",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript GYM 21" }),
      expect.objectContaining({ title: "Javascript GYM 22" }),
    ]);
  });
});
