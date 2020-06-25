const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

/* GET home page. */
router.get("/", authMiddleware, function (req, res, next) {
  res.render("index", { title: "Express", name: req.session.name });
});

module.exports = router;
