const express = require("express");
const router = express.Router();
const { SignupUser } = require("../Handler/userHandler");
const { LoginUser } = require("../Handler/userHandler");

router.route("/").post(SignupUser);

router.route("/login").post(LoginUser);


module.exports = router;