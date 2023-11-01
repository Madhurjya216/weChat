const express = require("express");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CODE, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;