const mongoose = require("mongoose");
const { Schema } = mongoose;
const notifyuserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  
});

module.exports = mongoose.model("notifyuser", notifyuserSchema);
