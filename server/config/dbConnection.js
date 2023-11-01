const express = require("express");
const mongoose = require("mongoose");


const db = () => {
    mongoose.connect(process.env.MONGODB_URI ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) => {
        console.log(`Connected Successfully!`);
    }).catch = (err) => {
        console.log(`Error message >>>`, err.message);
    }
}

module.exports = db;