import { Decimal } from "@prisma/client/runtime/library";

import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";

import { CheckInService } from "./check-in";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxnumberOfCheckInError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "I9",
      description: "",
      phone: "11996324674",
      latitude: 53.387023,
      longitude: -6.2327575,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 53.387023,
      userLongitude: -6.2327575,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice on the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 53.387023,
      userLongitude: -6.2327575,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: 53.387023,
        userLongitude: -6.2327575,
      })
    ).rejects.toBeInstanceOf(MaxnumberOfCheckInError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 53.387023,
      userLongitude: -6.2327575,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 53.387023,
      userLongitude: -6.2327575,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // 53.3643744,-6.2409116,13
  it("should not be able to check-in distant away from the gym ", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "I9",
      description: "",
      phone: "11996324674",
      latitude: new Decimal(53.3643744),
      longitude: new Decimal(-6.2409116),
      created_at: new Date(),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 53.387023,
        userLongitude: -6.2327575,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
