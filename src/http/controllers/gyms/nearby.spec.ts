import { app } from "@/app";

import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Some description",
        phone: "1111111111",
        latitude: 53.3856256,
        longitude: -6.2291968,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Typescript Gym",
        description: "Some description",
        phone: "1111111111",
        latitude: 58.309255,
        longitude: -8.9012358,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: 53.3856256,
        longitude: -6.2291968,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
