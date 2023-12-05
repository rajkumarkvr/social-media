const mongoose = require("mongoose");

const userSchema = {
  name: { type: String },
  email: { type: String },
  username: { type: String },
  password: { type: String },
};

module.exports = mongoose.model("Users", userSchema);
