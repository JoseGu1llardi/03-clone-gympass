import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsRequest {
  userId: string;
}

interface GetUserMetricsResponse {
  checkInsAmount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsAmount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsAmount,
    };
  }
}
