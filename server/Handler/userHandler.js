const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Error } = require("mongoose");
const generateToken = require("../config/generateToken");

// Signup function
const SignupUser = asyncHandler(async (req, res) => {
  const { name, id, pic, password, email } = req.body;
  try {
    if (!email || !name || !password) {
      res.status(400);
      throw new Error(`All the required fields need to be fillup!`);
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(400);
      throw new Error(`This Email has been used already!`);
    }

    const user = await User.create({
      id,
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      res.send(`User not Found!`);
    }
  } catch (error) {
    console.log("Internal Error >>>", error);
  }
});

// Login function
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   res.status(406);
  //   res.send("Please enter your Email and Password!");
  // }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { SignupUser, LoginUser };
