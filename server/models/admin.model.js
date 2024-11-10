const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopID: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
