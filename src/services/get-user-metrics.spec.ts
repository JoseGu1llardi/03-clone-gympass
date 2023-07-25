import { expect, describe, it, beforeEach } from "vitest";

import { GetUserMetricsService } from "./get-user-metrics";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Get user metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins amount from metrics", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkInsAmount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsAmount).toEqual(2);
  });
});
