const { AuthHandler } = require("../handlers/auth");
const supertest = require("supertest");
const app = require("../app");

jest.mock("../handlers/auth");

const testApp = supertest(app);
describe("Test auth route", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("GET /auth should return 405", async () => {
    const res = await testApp.get("/auth");
    expect(res.status).toEqual(404);
  });

  it("POST /auth should validate input", async () => {
    const res = await testApp.post("/auth");
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.status).toEqual(400);
  });

  it("POST /auth should validate userId length", async () => {
    const res = await testApp.post("/auth").send({
      userId: "x" * 256,
    });
    expect(res.status).toEqual(400);
    expect(res.body.errors[0].param).toEqual("userId");
  });

  it("POST /auth should return valid token for mocked handler", async () => {
    jest
      .spyOn(AuthHandler.prototype, "getPartnerToken")
      .mockImplementation(async () => {
        return "partner_xyz";
      });

    jest
      .spyOn(AuthHandler.prototype, "getUserToken")
      .mockImplementation(async () => {
        return { accessToken: "user_for_partner_xyz" };
      });
    const res = await testApp.post("/auth").send({
      userId: "x",
    });
    expect(res.status).toEqual(200);
    expect(res.body.accessToken).toEqual("user_for_partner_xyz");
  });

  it("POST /auth unable to receive partner token", async () => {
    jest
      .spyOn(AuthHandler.prototype, "getPartnerToken")
      .mockImplementation(async () => {
        return null;
      });
    const res = await testApp.post("/auth").send({
      userId: "x",
    });
    expect(res.status).toEqual(401);
    expect(res.body.error).toEqual("Unable to retrieve partner token");
  });

  it("POST /auth unable to receive user token", async () => {
    jest
      .spyOn(AuthHandler.prototype, "getPartnerToken")
      .mockImplementation(async () => {
        return "partner_xyz";
      });
    jest
      .spyOn(AuthHandler.prototype, "getUserToken")
      .mockImplementation(async () => {
        return null;
      });
    const res = await testApp.post("/auth").send({
      userId: "x",
    });
    expect(res.status).toEqual(401);
    expect(res.body.error).toEqual("Unable to retrieve user token");
  });
});
