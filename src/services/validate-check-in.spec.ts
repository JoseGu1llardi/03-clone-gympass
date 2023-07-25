import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";

import { ValidateCheckInService } from "./validate-check-in";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe("Validate check-in Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validate_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validate_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inxistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "202020",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes of this creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMilliseconds = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMilliseconds);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
