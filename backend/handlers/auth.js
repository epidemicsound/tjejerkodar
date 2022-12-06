const axios = require("axios");
const jwt = require("jsonwebtoken");
const axiosRetry = require("axios-retry");

axiosRetry(axios, { retries: 3 });

const BASE_URL = process.env.BASE_URL;
const partnerTokenUrl = `${BASE_URL}/v0/partner-token`;
const userTokenUrl = `${BASE_URL}/v0/token`;
const PARTNER_TOKEN_KEY = "partnerToken";

class AuthHandler {
  constructor(cache) {
    this.cache = cache;
  }

  async getPartnerToken() {
    let token = this.cache.get(PARTNER_TOKEN_KEY);
    if (token && token !== undefined) {
      return token;
    }
    try {
      const partnerTokenResponse = await axios.post(partnerTokenUrl, {
        accessKeyId: process.env.ACCESS_KEY,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
      });

      const partnerTokenContent = jwt.decode(
        partnerTokenResponse.data.accessToken
      );
      const ttl = partnerTokenContent.exp - Math.floor(new Date() / 1000);
      token = partnerTokenResponse.data.accessToken;
      this.cache.set(PARTNER_TOKEN_KEY, token, ttl);
      return token;
    } catch (error) {
      return null;
    }
  }

  async getUserToken({ userId, token }) {
    try {
      const userToken = await axios.post(
        userTokenUrl,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return userToken.data;
    } catch (error) {
      // removed cached partner token data
      this.cache.del(PARTNER_TOKEN_KEY);
      return null;
    }
  }
}

module.exports = { AuthHandler: AuthHandler, PARTNER_TOKEN_KEY };
