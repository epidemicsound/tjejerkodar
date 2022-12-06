const express = require("express");

const router = express.Router();

router.get("/", async function (req, res, next) {
  return res.status(200).json({
    hint: "This is a flag!",
    epidemic_sound_offices: "🇸🇪 🇺🇸 🇩🇪 🇳🇱 🇰🇷" });
});

module.exports = router;
