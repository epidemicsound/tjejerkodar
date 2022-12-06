const express = require("express");

const { body, validationResult } = require("express-validator");
const NodeCache = require("node-cache");
const { AuthHandler } = require("../handlers/auth");

const router = express.Router();

const cacheInstance = new NodeCache({ stdTTL: 60 * 15, checkperiod: 120 });

router.post(
  "/",
  body("userId").notEmpty().isLength({ max: 255 }),
  async function (req, res, next) {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body;
    const auth = new AuthHandler(cacheInstance);
    const token = await auth.getPartnerToken();
    if (!token) {
      return res
        .status(401)
        .send({ error: "Unable to retrieve partner token" });
    }

    const userToken = await auth.getUserToken({
      userId,
      token,
    });

    if (!userToken) {
      return res.status(401).send({ error: "Unable to retrieve user token" });
    }
    return res.send(userToken);
  }
);

module.exports = router;
