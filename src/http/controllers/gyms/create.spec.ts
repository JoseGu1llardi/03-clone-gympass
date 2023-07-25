import { app } from "@/app";

import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create a gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Some description",
        phone: "1111111111",
        latitude: 53.3856256,
        longitude: -6.2291968,
      });

    expect(response.statusCode).toEqual(201);
  });
});
