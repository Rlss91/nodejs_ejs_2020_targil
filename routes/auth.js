const querystring = require("querystring");
const express = require("express");
const userModule = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.render("loginpage", { err: req.query.err });
  res.render("loginpage", { err: req.session.err });
  req.session.err = undefined;
});
router.post("/", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    // res.render("loginpage", { err: "username or password missing" });
    req.session.err = "username or password missing";
    res.redirect("/auth");
    // const param = querystring.stringify({
    //   err: "username or password missing",
    //   data: "test",
    // });
    // res.redirect("/auth?" + param);
    return;
  }
  let user = userModule.find(username);
  if (user.length == 0) {
    req.session.err = "username or password incorrect";
    res.redirect("/auth");
  } else {
    if (user[0].password == password) {
      req.session.name = user[0].name;
      res.redirect("/");
    } else {
      req.session.err = "username or password incorrect";
      res.redirect("/auth");
    }
  }
});

module.exports = router;
