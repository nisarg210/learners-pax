require('dotenv').config()
const { Router } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const nodemailer= require("nodemailer");
const hbs =require('nodemailer-express-handlebars')
const connectDB = require("./config/db");
app.use(cors());
const ifer= connectDB();
console.log(ifer)
app.use(express.json({ extended: false }));

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
transporter.use('compile',hbs({
    viewEngine: 'express-handlebars',
    viewPath: './'
}));
exports.transporter=transporter;

app.use("/api/teacher", require("./routes/api/teacher"));
app.use("/api/announcement",require("./routes/api/announcement"))
app.use("/api/note",require("./routes/api/notes"))
app.use("/api/notifiy",require("./routes/api/notifiy"))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
