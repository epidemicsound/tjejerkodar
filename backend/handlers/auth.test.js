const axios = require("axios");
const NodeCache = require("node-cache");
const jwt = require("jsonwebtoken");
const { AuthHandler, PARTNER_TOKEN_KEY } = require("./auth");

jest.mock("axios");

describe("AuthHandler test", () => {
  let cache;
  let authHandler;
  const jwtContent = jwt.sign(
    {
      exp: Math.floor(new Date() / 1000) + 60, // 60 seconds from now
    },
    "secret"
  );
  beforeEach(() => {
    cache = new NodeCache({ stdTTL: 60 * 15, checkperiod: 120 });
    authHandler = new AuthHandler(cache);
  });
  afterEach(() => {
    cache.flushAll();
  });
  afterAll(() => {
    cache.close();
  });
  it("should get partner token with getPartnerToken and cache it", async function () {
    const tokenData = {
      accessToken: jwtContent,
    };
    axios.post.mockResolvedValue({ data: tokenData });
    const partnerToken = await authHandler.getPartnerToken();
    expect(partnerToken).toEqual(jwtContent);
    expect(authHandler.cache.get(PARTNER_TOKEN_KEY)).toEqual(partnerToken);
    const cachedTokenTTL = authHandler.cache.getTtl(PARTNER_TOKEN_KEY) / 1000;
    const expireIn = cachedTokenTTL - Math.floor(new Date() / 1000);
    expect(expireIn / 100).toBeCloseTo(60 / 100, 1);
  });

  it("should handle scenario when service is unavailable with cached token", async () => {
    authHandler.cache.set(PARTNER_TOKEN_KEY, jwtContent, 60);
    axios.post.mockRejectedValueOnce();
    const partnerToken = await authHandler.getPartnerToken();
    expect(partnerToken).toEqual(jwtContent);
  });

  it("should handle scenario when service is unavailable without cache", async () => {
    axios.post.mockRejectedValueOnce();
    const partnerToken = await authHandler.getPartnerToken();
    expect(partnerToken).toBeNull();
  });
});
