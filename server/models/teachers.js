const mongoose = require("mongoose");
const { Schema } = mongoose;
const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("teacher", teacherSchema);
