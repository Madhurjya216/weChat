require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const db = require("./config/dbConnection");
const { SignupUser } = require("./Handler/userHandler");

// middlewares
app.use(cors());
app.use(express.json());

// db connection
db();

// basic route
app.get("/", (req, res) => {
  res.send("Working all fine!"); 
}); 

// routes
app.use(SignupUser);


// srever listening
app.listen(PORT, () => {
  console.log(`Server is listening!`); 
});
 