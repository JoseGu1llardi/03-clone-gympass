import { app } from "@/app";

import request from "supertest";

import { prisma } from "@/lib/prisma";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create a check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: 53.3856256,
        longitude: -6.2291968,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: 53.3856256,
        longitude: -6.2291968,
      });

    expect(response.statusCode).toEqual(201);
  });
});
