const { Router } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require("./config/db");
app.use(cors());
connectDB();
app.use(express.json({ extended: false }));



app.use("/api/teacher", require("./routes/api/teacher"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
