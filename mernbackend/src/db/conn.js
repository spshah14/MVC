const mongoose = require("mongoose");
const express = require("express");
const app = express();
const conn = require("./conn");
const Register = require("../models/register");
const register = require("../models/register");

mongoose.connect("mongodb://localhost:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(e);
    console.log(`no connection`);
})
