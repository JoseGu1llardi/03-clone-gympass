import { expect, describe, it, beforeEach } from "vitest";

import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch nearby gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near GYM",
      description: "The body reaches what the minds believes!",
      phone: "(11) 996324674",
      latitude: 53.3856256,
      longitude: -6.2291968,
    });

    await gymsRepository.create({
      title: "Far GYM",
      description: "The body reaches what the minds believes!",
      phone: "(11) 996324674",
      latitude: 58.309255,
      longitude: -8.9012358,
    });

    const { gyms } = await sut.execute({
      userLatitude: 53.3856256,
      userLongitude: -6.2291968,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near GYM" })]);
  });
});
